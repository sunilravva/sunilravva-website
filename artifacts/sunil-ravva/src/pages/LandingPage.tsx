import { useEffect, useRef } from "react";
import {
  ArrowRight,
  ChevronDown,
  Briefcase,
  BookOpen,
  Users,
  Mail,
  Linkedin,
  Globe,
  Cpu,
  Network,
  Shield,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}

export default function LandingPage() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[45%] h-[45%] rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full bg-blue-500/5 blur-[140px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm tracking-tight">
              SR
            </div>
            <span className="font-semibold text-base tracking-tight hidden sm:block">
              Sunil Ravva
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            >
              About
            </a>
            <a
              href="#expertise"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            >
              Expertise
            </a>
            <a
              href="#content"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            >
              Insights
            </a>
            <a href="#cta">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-2 border-primary/30 hover:border-primary/60 hover:bg-primary/10 text-primary"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Subscribe</span>
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-36 px-6 z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-medium">
                <Globe className="w-4 h-4" />
                <span>Build Better. Think Broader.</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05]">
                Architecting the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">
                  Future
                </span>{" "}
                of Financial Technology.
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                VP Product &amp; Innovation Leader. 19+ years transforming
                complex technology into market-leading financial solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="https://www.linkedin.com/in/sunilravva"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="rounded-full text-base h-13 px-8 gap-2 w-full sm:w-auto"
                  >
                    Let&apos;s Connect <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <a
                  href="https://www.linkedin.com/newsletters/build-better-think-broader-7352652967512084481/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full text-base h-13 px-8 gap-2 border-border/60 hover:bg-secondary/60 w-full sm:w-auto"
                  >
                    <BookOpen className="w-5 h-5" /> Newsletter
                  </Button>
                </a>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="w-56 h-56 md:w-72 md:h-72 shrink-0">
              <div className="relative w-full h-full rounded-full border-2 border-primary/40 shadow-2xl overflow-hidden group">
                <img
                  src="/images/sunil.jpg"
                  alt="Sunil Ravva"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
                {/* Rotating ring */}
                <div className="absolute -inset-1 rounded-full border border-primary/25 animate-spin [animation-duration:12s] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40 hidden md:block">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="border-y border-border/50 bg-secondary/25 backdrop-blur-sm py-12 z-10 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "19+", label: "Years Experience" },
              { value: "8,000+", label: "LinkedIn Followers" },
              { value: "1,500+", label: "Newsletter Subscribers" },
              { value: "70+", label: "Architects Trained" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`scroll-reveal delay-${i + 1} flex flex-col items-center text-center space-y-2`}
              >
                <span className="text-4xl font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Company logos */}
          <div className="mt-10 pt-8 border-t border-border/40 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 hover:opacity-70 transition-opacity duration-500">
            <span className="text-lg font-bold tracking-tight text-foreground">
              LLOYDS BANKING GROUP
            </span>
            <span className="text-lg font-bold tracking-tight text-foreground">
              HSBC
            </span>
            <span className="text-lg font-bold tracking-tight text-foreground">
              CloudBees
            </span>
            <span className="text-lg font-bold tracking-tight text-foreground">
              WIPRO
            </span>
            <span className="text-lg font-bold tracking-tight text-foreground">
              TCS
            </span>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 md:py-32 px-6 z-10 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-14">
            <div className="scroll-reveal">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
                Bridging Vision and Execution.
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                I architect the future of financial innovation through product
                leadership that bridges vision and execution. With 19+ years
                transforming complex technology into market-leading solutions
                across banking, fintech, and enterprise platforms, I bring a
                unique blend of product strategy, architecture thinking, and
                execution excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 pt-4">
              <div className="scroll-reveal space-y-4">
                <h3 className="text-2xl font-semibold">The Current Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Currently leading data product initiatives at Lloyds
                  Technology Centre India, serving millions of customers across
                  the UK banking ecosystem. I own vision, strategy, and roadmap
                  for data products spanning retail and group functions —
                  balancing regulatory needs, data quality, and
                  speed-to-market.
                </p>
              </div>
              <div className="scroll-reveal delay-1 space-y-4">
                <h3 className="text-2xl font-semibold">The Difference</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  What sets me apart: I don&apos;t just manage products — I
                  architect sustainable systems. My approach blends deep
                  technical acumen with business strategy, ensuring every
                  decision drives measurable outcomes. From AI-driven features
                  to enterprise transformations, I thrive at the intersection of
                  innovation, ownership, and impact.
                </p>
              </div>
            </div>

            {/* Awards row */}
            <div className="scroll-reveal delay-2 pt-4 border-t border-border/40">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">
                Recognition
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  "HSBC 1st Architect of the Year 2019",
                  "Banking Tech Awards – Rising Fintech Star 2020",
                  "Technologist of the Quarter – HSBC 2021",
                ].map((award) => (
                  <div
                    key={award}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 border border-border/60 text-sm font-medium"
                  >
                    <Award className="w-4 h-4 text-primary shrink-0" />
                    {award}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <a
                  href="https://www.linkedin.com/feed/update/urn:li:activity:6743043053818257408/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl overflow-hidden border border-border/50 hover:border-primary/40 transition-colors bg-secondary/30"
                >
                  <div className="aspect-video overflow-hidden bg-secondary/60">
                    <img
                      src="/images/award-fintech-star.png"
                      alt="Rising Fintech Star – BankingTech Awards 2020"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold leading-snug">Rising Fintech Star – Highly Commended</p>
                      <p className="text-xs text-muted-foreground mt-1">BankingTech Awards 2020</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/pulse/award-belongs-her-sunil-ravva/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl overflow-hidden border border-border/50 hover:border-primary/40 transition-colors bg-secondary/30"
                >
                  <div className="aspect-video overflow-hidden bg-secondary/60">
                    <img
                      src="/images/award-belongs-her.png"
                      alt="The Award Belongs to Her"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold leading-snug">Architect of the Year – HSBC</p>
                      <p className="text-xs text-muted-foreground mt-1">LinkedIn Article</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/posts/sunilravva_lloydstechnologycentre-bestplacestowork-recognitionmatters-activity-7353052955920510976-3n5b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl overflow-hidden border border-border/50 hover:border-primary/40 transition-colors bg-secondary/30"
                >
                  <div className="aspect-video overflow-hidden bg-secondary/60">
                    <img
                      src="/images/lloyds-recognition.png"
                      alt="Data & AI Recognition – Lloyds Technology Centre"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold leading-snug">Data & AI Recognition – Lloyds Technology Centre</p>
                      <p className="text-xs text-muted-foreground mt-1">LinkedIn Post</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Expertise */}
      <section
        id="expertise"
        className="py-24 md:py-32 px-6 bg-secondary/20 border-y border-border/40 z-10 relative"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="scroll-reveal text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Core Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Delivering impact at the intersection of technology architecture
              and business strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Briefcase className="w-6 h-6" />,
                title: "Product Leadership & Strategy",
                body: "VP-track product ownership of enterprise platforms. Portfolio leadership across 15+ product initiatives. Cross-functional alignment with C-suite stakeholders. Market-driven roadmap strategy & execution.",
                tags: ["Roadmap Strategy", "Portfolio Leadership", "C-suite Alignment"],
                delay: "",
              },
              {
                icon: <Network className="w-6 h-6" />,
                title: "Enterprise Architecture & Scaling",
                body: "Cloud-native platform architecture (GCP, microservices). Solutions serving 10M+ end customers. Technical foundation for 5x+ organizational growth. API-first ecosystem thinking & partner enablement.",
                tags: ["Cloud-native (GCP)", "Microservices", "API-first"],
                delay: "delay-1",
              },
              {
                icon: <Cpu className="w-6 h-6" />,
                title: "Financial Innovation & Transformation",
                body: "Digital transformation leadership in banking & fintech. Customer Data Platform (CDP) strategy & deployment. Proven success with Fortune 500 & high-growth fintechs. Financial crime risk & threat mitigation expertise.",
                tags: ["CDP Strategy", "Digital Transformation", "Financial Crime Risk"],
                delay: "delay-2",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Thought Leadership & Community",
                body: 'Published weekly in "Build Better. Think Broader." newsletter. Trained 70+ architects across India & UK. Led innovation communities driving 50+ strategic initiatives. Speaker on enterprise product challenges.',
                tags: ["Weekly Newsletter", "Mentorship", "Innovation Culture"],
                delay: "delay-3",
              },
            ].map((card) => (
              <Card
                key={card.title}
                className={`scroll-reveal ${card.delay} bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/40 transition-colors duration-500 group`}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                    {card.icon}
                  </div>
                  <CardTitle className="text-xl leading-snug">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {card.body}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-secondary/80 border border-border/60 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Insights */}
      <section id="content" className="py-24 md:py-32 px-6 z-10 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="scroll-reveal flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-3">
                Featured Insights
              </h2>
              <p className="text-xl text-muted-foreground max-w-xl">
                Thoughts on product strategy, platform architecture, and
                building better financial systems.
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/sunilravva/recent-activity/all/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                className="gap-2 text-primary hover:text-primary hover:bg-primary/10 group shrink-0"
              >
                See more featured posts{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: "/images/featured-po-architecture.png",
                badge: "Product Leadership",
                title: "Why Product Owners & Architects Must Think as One",
                url: "https://www.linkedin.com/posts/sunilravva_productandtech-architecturepartnership-poleadership-activity-7353982266626228225-FKs7",
                delay: "",
              },
              {
                img: "/images/featured-innovation-backlog.png",
                badge: "Innovation",
                title: "Innovation Backlog: Architecture Enablers for Product Leaders",
                url: "https://www.linkedin.com/posts/sunilravva_innovationbacklog-architectureenablers-productleadership-activity-7353249954624102400-S_97",
                delay: "delay-1",
              },
              {
                img: "/images/featured-product-innovation.png",
                badge: "Product Ownership",
                title: "AI-Augmented Product Ownership",
                url: "https://www.linkedin.com/posts/sunilravva_productownership-architecture-innovation-activity-7369202579681005568-5NdS",
                delay: "delay-2",
              },
            ].map((item) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`scroll-reveal ${item.delay} group block`}
              >
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-border/50 bg-secondary/60">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-75 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-background/80 backdrop-blur text-xs font-semibold rounded-full border border-border/50">
                      {item.badge}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> LinkedIn Post
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="cta"
        className="py-24 md:py-32 px-6 border-t border-border/40 z-10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="scroll-reveal space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Let&apos;s Build Something That Matters.
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join 1,500+ product leaders and fintech innovators getting weekly
              insights on building scalable, human-centered financial products.
            </p>

            <form
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                window.open(
                  "https://www.linkedin.com/newsletters/build-better-think-broader-7352652967512084481/",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            >
              <Input
                type="email"
                placeholder="name@example.com"
                className="h-12 bg-background/50 border-border/60 text-base rounded-full px-6 focus-visible:ring-primary/50 flex-1"
              />
              <Button
                type="submit"
                className="h-12 rounded-full px-8 shrink-0 font-semibold"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-sm text-muted-foreground">
              Subscribe to &quot;Build Better. Think Broader.&quot; on LinkedIn — weekly
              insights, zero spam.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="h-px bg-border flex-1 max-w-24" />
              <span className="text-muted-foreground text-xs uppercase tracking-widest font-semibold">
                Or
              </span>
              <div className="h-px bg-border flex-1 max-w-24" />
            </div>

            <a
              href="https://www.linkedin.com/in/sunilravva"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-full h-13 px-8 border-border/60 hover:bg-secondary/60 group mt-2"
              >
                <Linkedin className="w-5 h-5 mr-2 text-[#0A66C2] group-hover:scale-110 transition-transform" />
                Connect on LinkedIn
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border/40 bg-background z-10 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                SR
              </div>
              <span className="font-semibold text-sm">Sunil Ravva</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <a
                href="https://www.linkedin.com/in/sunilravva"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4" /> linkedin.com/in/sunilravva
              </a>
              <a
                href="mailto:sunilravva@gmail.com"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" /> sunilravva@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/newsletters/build-better-think-broader-7352652967512084481/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" /> Newsletter
              </a>
            </div>

            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Sunil Ravva. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
