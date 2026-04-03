import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Award, Briefcase, BookOpen, Users, Mail, Linkedin, Globe, Cpu, Network, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Intersection Observer Hook for animations
function useIntersectionObserver(options = {}) {
  const [elements, setElements] = useState<Element[]>([]);
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (elements.length) {
      observer.current = new IntersectionObserver((observedEntries) => {
        setEntries(observedEntries);
      }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
        ...options
      });

      elements.forEach((element) => {
        observer.current?.observe(element);
      });
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [elements, options]);

  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in", "fade-in", "slide-in-from-bottom-8", "duration-1000", "fill-mode-forwards");
        entry.target.classList.remove("opacity-0", "translate-y-8");
        observer.current?.unobserve(entry.target);
      }
    });
  }, [entries]);

  return [setElements];
}

export function LandingPage() {
  const [setElements] = useIntersectionObserver();

  useEffect(() => {
    const animatedElements = Array.from(document.querySelectorAll(".scroll-animate"));
    setElements(animatedElements);
  }, [setElements]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold tracking-tighter text-xl">
              SR
            </div>
            <span className="font-semibold text-lg tracking-tight hidden sm:block">Sunil Ravva</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block">About</a>
            <a href="#expertise" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block">Expertise</a>
            <a href="#content" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block">Content</a>
            <Button variant="outline" className="gap-2 rounded-full border-primary/20 hover:border-primary/50 hover:bg-primary/10">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Subscribe</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Globe className="w-4 h-4" />
                <span>Build Better. Think Broader.</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                Architecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">Future</span> of Financial Technology.
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                VP Product & Innovation Leader. Transforming complex technology into market-leading solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                <Button size="lg" className="rounded-full text-base h-14 px-8 gap-2">
                  Let's Connect <ArrowRight className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-base h-14 px-8 gap-2 border-border/50 hover:bg-secondary/50">
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </Button>
              </div>
            </div>
            
            <div className="w-full max-w-sm md:w-1/3 animate-in fade-in zoom-in-95 duration-1000 delay-300">
              <div className="relative aspect-square rounded-full p-2 border border-border/50 bg-background/50 backdrop-blur-sm shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center text-7xl font-bold text-muted-foreground/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 mix-blend-multiply"></div>
                  SR
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block opacity-50">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Social Proof / Stats Bar */}
      <section className="border-y border-border/40 bg-secondary/30 backdrop-blur-sm py-10 z-10 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-border/0 md:divide-border/40">
            <div className="flex flex-col items-center justify-center text-center space-y-2 scroll-animate opacity-0 translate-y-8">
              <span className="text-4xl font-bold text-foreground">19+</span>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Years Experience</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center space-y-2 scroll-animate opacity-0 translate-y-8 delay-100">
              <span className="text-4xl font-bold text-foreground">8,000+</span>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">LinkedIn Followers</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center space-y-2 scroll-animate opacity-0 translate-y-8 delay-200">
              <span className="text-4xl font-bold text-foreground">1,000+</span>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Newsletter Subs</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center space-y-2 scroll-animate opacity-0 translate-y-8 delay-300">
              <span className="text-4xl font-bold text-foreground">70+</span>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Architects Trained</span>
            </div>
          </div>
          
          <div className="mt-12 pt-10 border-t border-border/40 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-xl font-bold tracking-tight">LLOYDS BANKING GROUP</div>
            <div className="text-xl font-bold tracking-tight">HSBC</div>
            <div className="text-xl font-bold tracking-tight flex items-center gap-2"><div className="w-6 h-6 bg-current rounded-sm"></div> CloudBees</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 px-6 z-10 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-12">
            <div className="scroll-animate opacity-0 translate-y-8">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Bridging Vision and Execution.</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                I architect the future of financial innovation through product leadership that bridges vision and execution. With 19+ years transforming complex technology into market-leading solutions across banking, fintech, and enterprise platforms, I bring a unique blend of product strategy, architecture thinking, and execution excellence.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 pt-8">
              <div className="space-y-6 scroll-animate opacity-0 translate-y-8">
                <h3 className="text-2xl font-semibold">The Current Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Currently leading data product initiatives at Lloyds Technology Centre India, serving millions of customers across the UK banking ecosystem. I own vision, strategy, and roadmap for data products spanning retail and group functions — balancing regulatory needs, data quality, and speed-to-market.
                </p>
              </div>
              
              <div className="space-y-6 scroll-animate opacity-0 translate-y-8 delay-100">
                <h3 className="text-2xl font-semibold">The Difference</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  What sets me apart: I don't just manage products — I architect sustainable systems. My approach blends deep technical acumen with business strategy, ensuring every decision drives measurable outcomes. From conceptualizing AI-driven features to orchestrating enterprise transformations, I thrive at the intersection of innovation, ownership, and impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do - Expertise Grid */}
      <section id="expertise" className="py-24 md:py-32 px-6 bg-secondary/20 border-y border-border/40 z-10 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 md:mb-24 text-center scroll-animate opacity-0 translate-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Core Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Delivering impact at the intersection of technology architecture and business strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <Card className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors duration-500 scroll-animate opacity-0 translate-y-8">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">Product Leadership & Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  VP-track product ownership of enterprise platforms. Portfolio leadership across 15+ product initiatives. Cross-functional alignment with C-suite stakeholders. Market-driven roadmap strategy & execution.
                </p>
                <ul className="space-y-2">
                  {['Roadmap Strategy', 'Portfolio Leadership', 'C-suite Alignment'].map(skill => (
                    <li key={skill} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors duration-500 scroll-animate opacity-0 translate-y-8 delay-100">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Network className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">Enterprise Architecture & Scaling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Cloud-native platform architecture (GCP, microservices). Solutions serving 10M+ end customers. Technical foundation for 5x+ organizational growth. API-first ecosystem thinking & partner enablement.
                </p>
                <ul className="space-y-2">
                  {['Cloud-native (GCP)', 'Microservices', 'API-first Ecosystem'].map(skill => (
                    <li key={skill} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors duration-500 scroll-animate opacity-0 translate-y-8 delay-200">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Cpu className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">Financial Innovation & Transformation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Digital transformation leadership in banking & fintech. Customer Data Platform (CDP) strategy & deployment. Proven success with Fortune 500 & high-growth fintechs. Financial crime risk & threat mitigation expertise.
                </p>
                <ul className="space-y-2">
                  {['CDP Strategy', 'Digital Transformation', 'Financial Crime Risk'].map(skill => (
                    <li key={skill} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors duration-500 scroll-animate opacity-0 translate-y-8 delay-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">Thought Leadership & Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Published weekly in "Build Better. Think Broader." newsletter. Trained 70+ architects across India & UK. Led innovation communities driving 50+ strategic initiatives. Speaker on enterprise product challenges and innovation culture.
                </p>
                <ul className="space-y-2">
                  {['Weekly Newsletter', 'Mentorship & Training', 'Innovation Culture'].map(skill => (
                    <li key={skill} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section id="content" className="py-24 md:py-32 px-6 z-10 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 scroll-animate opacity-0 translate-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Featured Insights</h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Thoughts on product strategy, platform architecture, and building better financial systems.
              </p>
            </div>
            <Button variant="ghost" className="gap-2 group text-primary hover:text-primary hover:bg-primary/10">
              Read all articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <a href="#" className="group scroll-animate opacity-0 translate-y-8 block">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 border border-border/50 bg-secondary">
                <img src="/__mockup/images/architecture-data.png" alt="Architecture Data" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-background/80 backdrop-blur text-xs font-semibold rounded-full border border-border/50">Featured Article</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">Why Product Owners Must Think Like Architects</h3>
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> 5 min read
              </p>
            </a>

            <a href="#" className="group scroll-animate opacity-0 translate-y-8 delay-100 block">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 border border-border/50 bg-secondary">
                <img src="/__mockup/images/ai-banking.png" alt="AI in Banking" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-background/80 backdrop-blur text-xs font-semibold rounded-full border border-border/50">Newsletter</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">Building AI-Ready Data Products in Banking</h3>
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> 7 min read
              </p>
            </a>

            <a href="#" className="group scroll-animate opacity-0 translate-y-8 delay-200 block">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 border border-border/50 bg-secondary flex items-center justify-center p-8 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background"></div>
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <Shield className="w-12 h-12 text-muted-foreground/50" />
                  <div className="w-full h-px bg-border/50"></div>
                  <Shield className="w-12 h-12 text-primary/50" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-background/80 backdrop-blur text-xs font-semibold rounded-full border border-border/50">Case Study</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">From Financial Crime Risk to Innovation: My 7-Year HSBC Journey</h3>
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> 10 min read
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 border-t border-border/40 z-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
        <div className="container mx-auto max-w-4xl text-center">
          <div className="scroll-animate opacity-0 translate-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Let's Build Something That Matters.</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Join 1,000+ product leaders and fintech innovators getting weekly insights on building scalable, human-centered financial products.
            </p>
            
            <div className="max-w-md mx-auto space-y-4">
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="h-12 bg-background/50 border-border/50 text-base rounded-full px-6 focus-visible:ring-primary/50"
                  required 
                />
                <Button type="submit" className="h-12 rounded-full px-8 shrink-0">
                  Subscribe
                </Button>
              </form>
              <p className="text-sm text-muted-foreground">Subscribe to "Build Better. Think Broader." newsletter.</p>
            </div>
            
            <div className="mt-16 flex items-center justify-center gap-4">
              <div className="h-px bg-border flex-1 max-w-[100px]"></div>
              <span className="text-muted-foreground text-sm uppercase tracking-widest font-semibold">Or</span>
              <div className="h-px bg-border flex-1 max-w-[100px]"></div>
            </div>
            
            <div className="mt-8">
              <Button variant="outline" size="lg" className="rounded-full h-14 px-8 border-border/50 hover:bg-secondary/50 hover:text-foreground group">
                <Linkedin className="w-5 h-5 mr-2 text-[#0A66C2] group-hover:scale-110 transition-transform" />
                Connect on LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40 bg-background z-10 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold tracking-tighter text-sm">
                SR
              </div>
              <span className="font-semibold text-sm">Sunil Ravva</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                <Linkedin className="w-4 h-4" /> linkedin.com/in/sunilravva
              </a>
              <a href="mailto:sunilravva@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" /> sunilravva@gmail.com
              </a>
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Newsletter
              </a>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Sunil Ravva. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
