import { useEffect, useRef, useState } from "react";
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
  Download,
  GraduationCap,
  BadgeCheck,
  MapPin,
  Coffee,
  Plane,
  Music,
  Lightbulb,
  Phone,
  Instagram,
  CalendarCheck,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

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

const HEADLINE_SEGMENTS: { text: string; gradient?: boolean }[] = [
  { text: "Architecting the " },
  { text: "Future", gradient: true },
  { text: " of Financial Technology." },
];

function TypewriterHeadline() {
  const fullLength = HEADLINE_SEGMENTS.reduce((n, s) => n + s.text.length, 0);
  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setTyped(fullLength);
      setDone(true);
      return;
    }

    const startDelay = 250; // lines up with hero-rise-2's own fade-in delay
    const perChar = 28; // ms per character — brisk, not gimmicky
    let i = 0;
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setTyped(i);
        if (i >= fullLength) {
          clearInterval(interval);
          setDone(true);
        }
      }, perChar);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [fullLength]);

  let remaining = typed;
  return (
    <>
      {HEADLINE_SEGMENTS.map((seg, idx) => {
        const shown = seg.text.slice(0, Math.max(0, remaining));
        remaining -= seg.text.length;
        if (!shown) return null;
        return seg.gradient ? (
          <span
            key={idx}
            className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300"
          >
            {shown}
          </span>
        ) : (
          <span key={idx}>{shown}</span>
        );
      })}
      <span
        className={`typewriter-cursor${done ? " typewriter-cursor-idle" : ""}`}
        aria-hidden="true"
      />
    </>
  );
}

function AnimatedStat({
  value,
  suffix = "",
  label,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const startTime = performance.now() + delay;
    let raf = 0;
    const tick = (now: number) => {
      if (now < startTime) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value, delay]);

  const formatted = display.toLocaleString();

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center space-y-2"
    >
      <span className="text-4xl font-bold text-foreground tabular-nums">
        {formatted}
        {suffix}
      </span>
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

const AWARDS = [
  {
    img: "/images/shine-award.png",
    title: "HSBC Shine Award",
    subtitle: "HSBC 2019",
    description: "Winner of the HSBC Shine Award at the HTI Annual Awards & Celebrations (TRANSCEND 2020), recognising exceptional performance and impact.",
    url: "https://www.youtube.com/watch?v=5i7NeuvIbJ8",
    linkLabel: "Watch on YouTube",
    isVideo: true,
  },
  {
    img: "/images/award-belongs-her.png",
    title: "1st Architect of the Year",
    subtitle: "HSBC 2019",
    description: "Recognised as the first-ever Architect of the Year at HSBC, awarded for excellence in technical architecture and product innovation.",
    url: "https://www.linkedin.com/pulse/award-belongs-her-sunil-ravva/",
    linkLabel: "Read Article",
    isVideo: false,
  },
  {
    img: "/images/award-fintech-star.png",
    title: "Rising Fintech Star",
    subtitle: "BankingTech Awards 2020",
    description: "Highly Commended at the prestigious BankingTech Awards 2020 for outstanding contributions to financial technology innovation.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:6743043053818257408/",
    linkLabel: "View on LinkedIn",
    isVideo: false,
  },
  {
    img: "/images/lloyds-recognition.png",
    title: "Certificate of Recognition",
    subtitle: "Lloyds Technology Centre 2026",
    description: "Recognised for driving Data & AI product excellence at Lloyds Technology Centre, accelerating delivery and shaping customer-first data products.",
    url: "https://www.linkedin.com/posts/sunilravva_lloydstechnologycentre-bestplacestowork-recognitionmatters-activity-7353052955920510976-3n5b",
    linkLabel: "View on LinkedIn",
    isVideo: false,
  },
];

function WelcomeToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("welcomeToastShown")) return;
    const showTimer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem("welcomeToastShown", "1");
    }, 1500);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const hideTimer = setTimeout(() => setVisible(false), 7000);
    return () => clearTimeout(hideTimer);
  }, [visible]);

  return (
    <div
      role="status"
      className={`fixed bottom-6 right-6 z-[60] max-w-[300px] rounded-xl border border-border/60 bg-card/95 backdrop-blur-sm p-4 shadow-lg transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium leading-snug">
          Glad you want to know more about me. Welcome!
        </p>
        <button
          aria-label="Close"
          onClick={() => setVisible(false)}
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-muted-foreground mt-1.5">
        Feel free to look around and reach out.
      </p>
    </div>
  );
}

export default function LandingPage() {
  useScrollReveal();
  const [selectedAward, setSelectedAward] = useState<typeof AWARDS[0] | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <WelcomeToast />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[45%] h-[45%] rounded-full bg-primary/8 blur-[140px] animate-drift-a" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full bg-blue-500/5 blur-[140px] animate-drift-b" />
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
              href="#background"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            >
              Background
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
            <a
              href="#mentorship"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden lg:block"
            >
              Mentorship
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            >
              Contact
            </a>
            <a href="#contact">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-2 border-primary/30 hover:border-primary/60 hover:bg-primary/10 text-primary"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Contact Sunil</span>
              </Button>
            </a>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <nav className="flex flex-col gap-1 mt-10">
                  {[
                    { href: "#about", label: "About" },
                    { href: "#background", label: "Background" },
                    { href: "#expertise", label: "Expertise" },
                    { href: "#content", label: "Insights" },
                    { href: "#mentorship", label: "Mentorship" },
                    { href: "#contact", label: "Contact" },
                  ].map((link) => (
                    <SheetClose asChild key={link.href}>
                      <a
                        href={link.href}
                        className="text-base font-medium text-foreground py-3 px-2 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-36 px-6 z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-8">
              <div className="hero-rise hero-rise-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-medium">
                <Globe className="w-4 h-4" />
                <span>Build Better. Think Broader.</span>
              </div>

              <h1
                className="hero-rise hero-rise-2 text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05]"
                aria-label="Architecting the Future of Financial Technology."
              >
                <TypewriterHeadline />
              </h1>

              <p className="hero-rise hero-rise-3 text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                VP Product &amp; Innovation Leader. 19+ years transforming
                complex technology into market-leading financial solutions.
              </p>

              <div className="hero-rise hero-rise-4 flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
                <a href="#content">
                  <Button
                    size="lg"
                    className="rounded-full text-base h-13 px-8 gap-2 w-full sm:w-auto"
                  >
                    View My Work <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <a
                  href="/sunil-ravva-resume.pdf"
                  download
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full text-base h-13 px-8 gap-2 border-border/60 hover:bg-secondary/60 w-full sm:w-auto"
                  >
                    <Download className="w-5 h-5" /> Download Resume
                  </Button>
                </a>
                <a href="mailto:sunilravva@gmail.com">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="rounded-full text-base h-13 px-8 gap-2 w-full sm:w-auto"
                  >
                    <Mail className="w-5 h-5" /> Email Me
                  </Button>
                </a>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="hero-rise hero-rise-photo w-56 h-56 md:w-72 md:h-72 shrink-0 animate-float">
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
            <AnimatedStat value={19} suffix="+" label="Years Experience" delay={0} />
            <AnimatedStat value={8000} suffix="+" label="LinkedIn Followers" delay={120} />
            <AnimatedStat value={1600} suffix="+" label="Newsletter Subscribers" delay={240} />
            <AnimatedStat value={70} suffix="+" label="Architects Trained" delay={360} />
          </div>

          {/* Company logos */}
          <div className="mt-10 pt-8 border-t border-border/40">
            <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">
              Trusted across leading banks &amp; tech companies
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 md:gap-x-14">
              {[
                { name: "Lloyds Banking Group", domain: "lloydsbankinggroup.com" },
                { name: "HSBC", domain: "hsbc.com" },
                { name: "CloudBees", domain: "cloudbees.com" },
                { name: "Wipro", domain: "wipro.com" },
                { name: "TCS", domain: "tcs.com" },
              ].map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300"
                  title={c.name}
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${c.domain}&sz=64`}
                    alt={`${c.name} logo`}
                    width={28}
                    height={28}
                    loading="lazy"
                    className="w-7 h-7 object-contain rounded-sm bg-white/95 p-0.5 shadow-sm"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <span className="text-base font-bold tracking-tight text-foreground">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
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
                  for data products spanning retail and group functions -
                  balancing regulatory needs, data quality, and
                  speed-to-market.
                </p>
              </div>
              <div className="scroll-reveal delay-1 space-y-4">
                <h3 className="text-2xl font-semibold">The Difference</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  What sets me apart: I don&apos;t just manage products - I
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {AWARDS.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => setSelectedAward(item)}
                    className="group flex flex-col items-center text-center gap-3 cursor-pointer"
                  >
                    <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-border/50 group-hover:border-primary/60 transition-all duration-300 group-hover:shadow-[0_0_24px_hsl(38_92%_55%_/_0.35)]">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {item.isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/30">
                          <div className="w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
                            <svg className="w-3 h-3 text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary bg-background/80 backdrop-blur px-2 py-1 rounded-full">View</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background — Education, Certifications, Languages, Fun Facts */}
      <section
        id="background"
        className="py-24 md:py-32 px-6 bg-secondary/10 border-y border-border/40 z-10 relative"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="scroll-reveal text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              Get to know me
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              A bit more about Sunil
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The education, certifications, and curiosities that shape how I
              build products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Education */}
            <Card className="scroll-reveal bg-card/60 backdrop-blur-sm border-border/50 hover-lift">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">Education</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="border-l-2 border-primary/40 pl-4">
                  <h4 className="font-semibold text-base">
                    Master of Computer Applications (MCA)
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Computer Science · 2005 – 2008
                  </p>
                </div>
                <div className="border-l-2 border-border pl-4">
                  <h4 className="font-semibold text-base">
                    Bachelor of Information Technology
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Hi-Tech College of Engineering · 2002 – 2005
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="scroll-reveal delay-1 bg-card/60 backdrop-blur-sm border-border/50 hover-lift">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <BadgeCheck className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">Certifications</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    {
                      name: "Certified SAFe® Product Owner / Product Manager (POPM)",
                      issuer: "Scaled Agile, Inc.",
                      tag: "Product",
                    },
                    {
                      name: "Google Cloud - Professional Cloud Architect",
                      issuer: "Google Cloud",
                      tag: "Google",
                    },
                  ].map((cert) => (
                    <li
                      key={cert.name}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <BadgeCheck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-foreground/90">{cert.name}</span>
                          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-semibold whitespace-nowrap mt-0.5">
                            {cert.tag}
                          </span>
                        </div>
                        <span className="block text-xs text-muted-foreground/80">
                          {cert.issuer}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground/80 mt-5 pt-4 border-t border-border/40">
                  Plus ICAgile APM, HSBC Enterprise Engineer Mentor, Train the
                  Trainer, Oracle Cloud, Microsoft Certified Professional, ITIL®
                  v3 and more.
                </p>
                <a
                  href="https://www.linkedin.com/in/sunilravva/details/certifications/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mt-2"
                >
                  View full list on LinkedIn <ArrowRight className="w-3 h-3" />
                </a>
              </CardContent>
            </Card>

            {/* Companies I worked at */}
            <Card className="scroll-reveal delay-2 bg-card/60 backdrop-blur-sm border-border/50 hover-lift">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">Where I&apos;ve worked</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ol className="relative border-l border-border/60 ml-2 space-y-5">
                  {[
                    {
                      company: "Lloyds Technology Centre India",
                      role: "Data Product Owner",
                      dates: "Oct 2024 – Present",
                    },
                    {
                      company: "HSBC Data Processing Pvt. Ltd",
                      role: "Senior Product Owner — VP",
                      dates: "Sep 2023 – Oct 2024",
                    },
                    {
                      company: "CloudBees",
                      role: "Product Architect & Lead Product Manager",
                      dates: "Jun 2022 – May 2023",
                    },
                    {
                      company: "HSBC",
                      role: "Associate Lead Architect / Head - Practices & Innovation",
                      dates: "May 2015 – Jul 2022",
                    },
                    {
                      company: "Tata Consultancy Services",
                      role: "Information & Network Security",
                      dates: "Apr 2014 – Apr 2015",
                    },
                    {
                      company: "Wipro Technologies",
                      role: "Tech Lead (Lloyds, BestBuy, Foster's, Shell)",
                      dates: "Feb 2008 – Mar 2014",
                    },
                  ].map((job, i) => (
                    <li key={i} className="ml-4">
                      <span className="absolute -left-[5px] mt-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />
                      <h4 className="text-sm font-semibold text-foreground leading-snug">
                        {job.company}
                      </h4>
                      <p className="text-xs text-primary mt-0.5">{job.role}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {job.dates}
                      </p>
                    </li>
                  ))}
                </ol>
                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-border/40 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>Based in Hyderabad, India · Working with UK &amp; global teams</span>
                </div>
              </CardContent>
            </Card>

            {/* Fun Facts */}
            <Card className="scroll-reveal delay-3 bg-card/60 backdrop-blur-sm border-border/50 hover-lift">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">Fun facts</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    {
                      icon: <BookOpen className="w-4 h-4 text-primary" />,
                      text: "Publishes a weekly newsletter - Build Better. Think Broader, to 1,600+ product leaders.",
                    },
                    {
                      icon: <Users className="w-4 h-4 text-primary" />,
                      text: "Has personally trained 70+ architects across India and the UK.",
                    },
                    {
                      icon: <Coffee className="w-4 h-4 text-primary" />,
                      text: "Best ideas usually arrive between the second cup of coffee and a long walk.",
                    },
                    {
                      icon: <Plane className="w-4 h-4 text-primary" />,
                      text: "Loves spending time exploring new cultures with family on weekend trips.",
                    },
                    {
                      icon: <Music className="w-4 h-4 text-primary" />,
                      text: "Unwinds with classic Telugu cinema and the occasional impromptu cricket match.",
                    },
                  ].map((fact, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-0.5 shrink-0">{fact.icon}</span>
                      <span>{fact.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
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
                tags: ["Data Strategy", "Digital Transformation", "Financial Crime Risk"],
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
                className={`scroll-reveal ${card.delay} bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/40 hover-lift duration-500 group`}
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

      {/* Speaking & Mentorship */}
      <section
        id="mentorship"
        className="py-24 md:py-32 px-6 bg-secondary/15 border-y border-border/40 z-10 relative"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="scroll-reveal text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              Giving back
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Speaking &amp; Mentorship
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building the next generation of architects and product leaders —
              one conversation, cohort, and newsletter issue at a time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            <Card className="scroll-reveal bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/40 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">70+</CardTitle>
                <p className="text-sm font-semibold text-foreground/90">
                  Architects trained
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Personally trained 70+ architects across{" "}
                  <span className="text-foreground font-medium">
                    Hyderabad, Pune and UK locations
                  </span>{" "}
                  during my time at HSBC - including Train-the-Trainer and
                  Enterprise Engineer Programme cohorts.
                </p>
              </CardContent>
            </Card>

            <Card className="scroll-reveal delay-1 bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/40 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <BookOpen className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">1,600+</CardTitle>
                <p className="text-sm font-semibold text-foreground/90">
                  Newsletter subscribers
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Weekly insights on product strategy, architecture and
                  fintech via{" "}
                  <span className="text-foreground font-medium">
                    &quot;Build Better. Think Broader.&quot;
                  </span>{" "}
                  on LinkedIn.
                </p>
                <a
                  href="https://www.linkedin.com/newsletters/build-better-think-broader-7352652967512084481/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mt-3"
                >
                  Read the newsletter <ArrowRight className="w-3 h-3" />
                </a>
              </CardContent>
            </Card>

            <Card className="scroll-reveal delay-2 bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/40 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">50+</CardTitle>
                <p className="text-sm font-semibold text-foreground/90">
                  Innovation initiatives
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Built and led innovation communities at HSBC driving 50+
                  strategic initiatives - fintech alliances, hackathons and
                  enterprise idea management.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="scroll-reveal flex flex-wrap justify-center gap-3">
            <a
              href="https://topmate.io/sunilravva"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="rounded-full gap-2">
                <CalendarCheck className="w-4 h-4" /> Book a 1:1 on Topmate
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/in/sunilravva"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-full gap-2 border-border/60 hover:bg-secondary/60"
              >
                <Linkedin className="w-4 h-4 text-[#0A66C2]" /> Connect on
                LinkedIn
              </Button>
            </a>
            <a href="#contact">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full gap-2 border-border/60 hover:bg-secondary/60"
              >
                <Mail className="w-4 h-4" /> Invite Sunil to speak
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA — Newsletter signup */}
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
              Join 1,600+ product leaders and fintech innovators getting weekly
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
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-24 md:py-32 px-6 bg-secondary/15 border-t border-border/40 z-10 relative"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="scroll-reveal text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              Get in touch
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Contact Sunil
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The fastest ways to reach me - pick whichever you prefer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <a
              href="mailto:sunilravva@gmail.com"
              className="group flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-card/60 border border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-base">Email</p>
                <p className="text-sm text-muted-foreground mt-1 break-all">
                  sunilravva@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/sunilravva"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-card/60 border border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                <Linkedin className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-base">LinkedIn</p>
                <p className="text-sm text-muted-foreground mt-1">
                  /in/sunilravva
                </p>
              </div>
            </a>

            <a
              href="https://www.instagram.com/sunil.ravva/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-card/60 border border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-base">Instagram</p>
                <p className="text-sm text-muted-foreground mt-1">
                  @sunil.ravva
                </p>
              </div>
            </a>

            <a
              href="tel:+917093902808"
              className="group flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-card/60 border border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-base">Phone</p>
                <p className="text-sm text-muted-foreground mt-1">
                  +91 70939 02808
                </p>
              </div>
            </a>
          </div>

          <Card className="scroll-reveal bg-card/60 backdrop-blur-sm border-border/50 max-w-2xl mx-auto hover-lift">
            <CardHeader>
              <CardTitle className="text-xl">Send a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
                  const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
                  const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";
                  const subject = encodeURIComponent(`Hello from ${name || "your website"}`);
                  const body = encodeURIComponent(
                    `${message}\n\n— ${name}${email ? ` (${email})` : ""}`
                  );
                  window.location.href = `mailto:sunilravva@gmail.com?subject=${subject}&body=${body}`;
                }}
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium block mb-1.5">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="h-11 bg-background/50 border-border/60 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium block mb-1.5">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="h-11 bg-background/50 border-border/60 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium block mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me a bit about what you're working on…"
                    className="w-full bg-background/50 border border-border/60 rounded-lg px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-full h-12 px-8 gap-2 w-full sm:w-auto"
                >
                  <Mail className="w-4 h-4" /> Send Message
                </Button>
                <p className="text-xs text-muted-foreground">
                  This will open your email client with the message pre-filled.
                </p>
              </form>
            </CardContent>
          </Card>
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
              <a
                href="/sunil-ravva-resume.pdf"
                download
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Resume
              </a>
              <a
                href="#contact"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" /> Contact
              </a>
            </div>

            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Sunil Ravva. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Recognition Modal */}
      {selectedAward && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedAward(null)}
        >
          <div
            className="relative bg-secondary/90 border border-border/60 rounded-2xl overflow-hidden max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={selectedAward.img}
                alt={selectedAward.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-3">
              <div>
                <h3 className="text-xl font-bold">{selectedAward.title}</h3>
                <p className="text-sm text-primary font-medium mt-0.5">{selectedAward.subtitle}</p>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{selectedAward.description}</p>
              <div className="flex gap-3 pt-2">
                <a
                  href={selectedAward.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full gap-2 rounded-full">
                    {selectedAward.isVideo ? (
                      <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                    {selectedAward.linkLabel}
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="rounded-full px-4"
                  onClick={() => setSelectedAward(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
