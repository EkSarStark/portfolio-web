import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Terminal, ArrowDown, FileText, Code2, Cpu, Box, BookOpen, FlaskConical } from 'lucide-react';

interface HeroProps {
  onOpenPrintModal: () => void;
  onSelectDomain: (domain: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPrintModal, onSelectDomain }) => {
  const domains = [
    { label: 'Local AI Systems', domain: 'ai', icon: Cpu },
    { label: '3D CGI & Blender', domain: '3d_vfx', icon: Box },
    { label: 'Linux & Software', domain: 'programming', icon: Code2 },
    { label: 'Worldbuilding', domain: 'worldbuilding', icon: BookOpen },
    { label: 'Research', domain: 'research', icon: FlaskConical },
  ];

  return (
    <section id="top" className="relative pt-16 pb-20 md:pt-24 md:pb-24 border-b border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border/60 text-foreground text-xs font-mono mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Computer Science • Systems & AI Engineer</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground font-sans leading-[1.1]">
            Sai Deepak Sarma
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg font-medium text-muted-foreground font-sans leading-relaxed">
            {PERSONAL_INFO.subtitle}
          </p>

          {/* Profile Statement */}
          <p className="mt-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed max-w-2xl">
            {PERSONAL_INFO.profileText}
          </p>

          {/* Minimal Domain Focus Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {domains.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.domain}
                  onClick={() => onSelectDomain(item.domain)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary/50 hover:bg-secondary text-foreground border border-border/50 text-xs font-medium transition-all"
                >
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Minimal Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#serix-terminal"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-semibold text-xs sm:text-sm hover:opacity-90 transition-all shadow-sm"
              id="hero-serix-btn"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch SERIX Terminal</span>
            </a>

            <button
              onClick={onOpenPrintModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary border border-border/60 text-foreground hover:bg-secondary/80 text-xs sm:text-sm font-medium transition-all"
              id="hero-pdf-btn"
            >
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span>PDF Summary</span>
            </button>

            <a
              href="#projects"
              className="inline-flex items-center gap-1 px-4 py-2.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors ml-auto sm:ml-0"
            >
              <span>Explore</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Clean Metric Stats */}
          <div className="mt-14 pt-8 border-t border-border/40 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl font-bold font-mono text-foreground">7+</div>
              <div className="text-[11px] text-muted-foreground font-mono mt-0.5">Disciplines</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-foreground">SERIX</div>
              <div className="text-[11px] text-muted-foreground font-mono mt-0.5">Local AI Core</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-foreground">3D CGI</div>
              <div className="text-[11px] text-muted-foreground font-mono mt-0.5">Procedural Nodes</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-foreground">Omnian</div>
              <div className="text-[11px] text-muted-foreground font-mono mt-0.5">Universe Canon</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
