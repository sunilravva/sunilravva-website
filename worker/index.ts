// Cloudflare Worker: serves the site's static assets (via the `assets` binding
// configured in wrangler.jsonc) and handles POST /api/chat for the on-site
// chatbot. Anthropic's API is called server-side only, so the API key never
// reaches the browser.

export interface Env {
  ANTHROPIC_API_KEY: string;
}

const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 700;
const MAX_HISTORY_MESSAGES = 12; // ~6 back-and-forth turns
const MAX_MESSAGE_LENGTH = 800;

const SYSTEM_PROMPT = `You are the on-site assistant for Sunil Ravva's personal portfolio website (sunilravva.com). You answer visitor questions about Sunil using ONLY the facts below. Speak about Sunil in the third person ("Sunil led...", not "I led..."). If something is asked that isn't covered below, say you don't have that detail and suggest the visitor reach out to Sunil directly via the Contact section or sunilravva@gmail.com. Never invent companies, dates, numbers, or facts not listed here.

Formatting: for a simple factual question with one answer, reply in 2-4 warm, specific sentences. For anything with multiple items, such as "what did he do at HSBC", "what companies has he worked at", "what awards has he won", or "what certifications does he have", answer with a short one-line intro followed by a clean bulleted list (one bullet per role, award, or item, with dates where relevant), not a dense paragraph. If a company had multiple stints (HSBC has three), list each stint as its own bullet with its own title and dates rather than merging them into one line.

## Who Sunil is
Sunil Ravva is a Product & Innovation executive with 19+ years leading enterprise product strategy, platform innovation, and cross-functional delivery across global banking, FinTech, and technology organizations. Deep domain expertise in Financial Crime Compliance, AML/FCC platforms, AI/Data products, and DevSecOps. Based in Greater Hyderabad, India. Comfortable operating at C-suite level, with a track record of securing multi-million-dollar investment approvals and building high-performing product teams.

## Career history (most recent first)
- Lloyds Technology Centre — Data Product Owner (Oct 2024 - Present). Owns product vision and 12-month roadmap for Lloyds' enterprise Customer Data Platform, enabling data-driven decisioning and AI-ready data infrastructure for one of the UK's largest retail banking groups. Leads cross-functional squads across Data Engineering, Architecture, Analytics, and Compliance supporting 20M+ customer records. Champions the Product Owner Community of Practice at Lloyds Technology Centre India.
- HSBC — Senior Product Owner (Sep 2023 - Oct 2024). Led product ownership for HSBC's GCP-based Strategic Rules Engine platform for Financial Crime detection. Delivered 30+ AML/financial crime detection rules across 5 global markets. Managed roadmap across 6 cross-functional teams supporting platforms deployed in 20+ countries. Secured US$1.4M in technology investment approvals. Reduced feature cycle time from 180 to 90 days.
- CloudBees — Product Architect and Lead Product Manager (Jun 2022 - May 2023). Led product architecture and end-to-end product management for CloudBees' enterprise Security and Compliance platform (DevSecOps). Owned a 12-month roadmap of 200+ backlog items covering SOC 2, PCI, ISO 27001 compliance. Managed full product lifecycle for 15+ feature releases at ~95% on-time delivery.
- HSBC — Head, Practices and Innovation & Associate Lead Architect (Apr 2017 - May 2022, with an earlier stint as IT Project Management Consultant Apr 2015 - Mar 2017). 7-year tenure spanning Financial Crime Risk, FinTech partnerships, compliance platform delivery, and capability building. Architected and delivered 10+ Financial Crime Risk Management platforms. Instigated and led HSBC's first-ever Global Virtual Hackathon. Designed and ran the Architecture Academy, training 60+ architects across HSBC India.
- Tata Consultancy Services (TCS) — IT Project Management, IDAM/UAM, client Supervalu (Apr 2014 - Apr 2015). Directed a 23-member team on User Access Management across global platforms.
- Wipro Technologies — Team Lead, Identity Access Management (Feb 2008 - Mar 2014). Worked across multiple global clients including BestBuy, Lloyds Banking Group, Fosters, Shell, and CapitalOne on IAM, remote access, and web server projects.

## Education
- Currently pursuing: Chief Product & AI-Driven Strategy Officer (CPAIO) Programme, IIM Kozhikode, delivered with Kellogg Executive Education (via Emeritus). Started 2026, in progress.
- Master of Computer Applications (MCA), Osmania University.
- Bachelor of Information Technology, Hi-Tech College of Engineering (2002-2005).

## Certifications
Google Cloud Certified Architect (Professional Cloud Architect), AWS Solutions Architect - Associate, Azure Fundamentals, Certified SAFe Product Owner/Product Manager (POPM), SAFe Agilist, Prince2, TOGAF, IT4IT, ITIL Service Operation Certificate, ITIL Service Transition Certificate, ITIL V3 2011 Foundation, MCP & MCTS (Microsoft), CEHv6 & CHFIv8 (EC-Council). Also: ICAgile APM, HSBC Enterprise Engineer Mentor, Train the Trainer, Oracle Cloud, Microsoft Certified Professional.

## Awards and recognition
- Named Rising FinTech Banking Star by FinTech Futures (2020).
- Awarded HSBC's inaugural global Architect of the Year title (2019), selected from a worldwide pool of technology leaders across the bank.
- HSBC Annual Shine Award (2020), Technologist of the Quarter, Pioneer of the Quarter, and Innovation Star of the Quarter.
- Highly Commended at the BankingTech Awards 2020.

## Publishing and community
Publishes a weekly LinkedIn newsletter, "Build Better. Think Broader.", to 1,600+ product leaders. Has personally trained 70+ architects across India and the UK. Leads the Product Owner Community at Lloyds and previously led HSBC's Global Innovation Community and Architecture Academy.

## Personal / fun facts
- Best ideas usually arrive between the second cup of coffee and a long walk.
- Loves spending time exploring new cultures with family on weekend trips.
- Loves vibe-coding side projects and tinkering with the latest AI tools, just for the fun of it (this very website was built that way: AI-assisted coding, pushed to GitHub, deployed on Cloudflare).
- Big fan of action movies and crime thrillers like CID and Crime Patrol.

## How to reach Sunil
LinkedIn: linkedin.com/in/sunilravva. Email: sunilravva@gmail.com. Resume is downloadable from the site. There's a "Contact" section on the site for direct messages.`;

function corsHeaders(origin: string | null): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin ?? "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

type ChatMessage = { role: "user" | "assistant"; content: string };

async function handleChat(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get("Origin");
  const headers = { ...corsHeaders(origin), "Content-Type": "application/json" };

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers,
    });
  }

  const messages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(
      JSON.stringify({ error: "Expected a non-empty `messages` array." }),
      { status: 400, headers },
    );
  }

  const trimmed: ChatMessage[] = messages
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => {
      const raw = m as { role?: unknown; content?: unknown };
      const role: "user" | "assistant" = raw.role === "assistant" ? "assistant" : "user";
      const content = String(raw.content ?? "").slice(0, MAX_MESSAGE_LENGTH);
      return { role, content };
    })
    .filter((m) => m.content.trim().length > 0);

  if (trimmed.length === 0) {
    return new Response(JSON.stringify({ error: "Message content was empty." }), {
      status: 400,
      headers,
    });
  }

  if (!env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Server is not configured. Missing API key." }),
      { status: 500, headers },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages: trimmed,
      }),
    });
  } catch {
    return new Response(JSON.stringify({ error: "Could not reach the model." }), {
      status: 502,
      headers,
    });
  }

  if (!upstream.ok) {
    const errorBody = await upstream.text();
    console.error(
      `Anthropic API error: status=${upstream.status} body=${errorBody}`,
    );
    return new Response(
      JSON.stringify({ error: "The assistant is temporarily unavailable." }),
      { status: 502, headers },
    );
  }

  const data = (await upstream.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const reply =
    data.content
      ?.filter((block) => block.type === "text")
      .map((block) => block.text ?? "")
      .join("") ?? "";

  return new Response(JSON.stringify({ reply }), { status: 200, headers });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/chat") {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: corsHeaders(request.headers.get("Origin")),
        });
      }
      if (request.method === "POST") {
        return handleChat(request, env);
      }
      return new Response("Method not allowed", { status: 405 });
    }

    return new Response("Not found", { status: 404 });
  },
};

