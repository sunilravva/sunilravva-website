import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Youtube } from "lucide-react";
import { RECOGNITION_ITEMS, type RecognitionItem } from "@/data/recognition";

export default function RecognitionPage() {
  const [selected, setSelected] = useState<RecognitionItem | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50 py-6 px-6">
        <div className="container mx-auto max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sunilravva.com
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
          Recognition
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Awards &amp; Certificates
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-14">
          A complete record of awards, recognitions, and certificates received
          throughout my career.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {RECOGNITION_ITEMS.map((item) => (
            <button
              key={item.title}
              onClick={() => setSelected(item)}
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
                  <span className="text-xs font-semibold text-primary bg-background/80 backdrop-blur px-2 py-1 rounded-full">
                    View
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                {item.subtitle && (
                  <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </main>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card border border-border/60 rounded-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.img}
              alt={selected.title}
              className="w-full aspect-square object-cover"
            />
            <div className="p-6 space-y-3">
              <div>
                <h3 className="text-xl font-bold">{selected.title}</h3>
                {selected.subtitle && (
                  <p className="text-sm text-primary font-medium mt-0.5">
                    {selected.subtitle}
                  </p>
                )}
              </div>
              {selected.description && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {selected.description}
                </p>
              )}
              {selected.url && (
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  {selected.isVideo ? (
                    <Youtube className="w-4 h-4" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                  {selected.linkLabel ?? "View"}
                </a>
              )}
              <button
                onClick={() => setSelected(null)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors pt-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
