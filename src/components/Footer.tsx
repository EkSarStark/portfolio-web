import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Mail, Download, FileText, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenPrintModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrintModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 border-t border-border/60 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* PROMINENT DOWNLOAD ENTIRE WEBSITE AS PDF RESUME CTA BANNER */}
        <div className="mb-14 p-8 sm:p-10 rounded-3xl bg-secondary/30 border border-border/80 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complete Portfolio PDF Resume</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              Download Entire Portfolio as PDF Resume
            </h3>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Export all profile details, technical skills, projects, uploaded certificates, AI architecture, worldbuilding canon, and research topics into a clean, single PDF document.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={onOpenPrintModal}
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-foreground text-background font-semibold text-xs sm:text-sm shadow-md transition-all hover:opacity-90 hover:scale-[1.02]"
              id="footer-download-resume-btn"
            >
              <Download className="w-4 h-4 text-emerald-500 transition-transform group-hover:-translate-y-0.5" />
              <span>Download PDF Resume</span>
            </button>
          </div>

        </div>

        {/* Footer Main Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-foreground font-semibold text-sm tracking-tight">
              <span className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center justify-center font-mono font-bold">
                SD
              </span>
              <span>{PERSONAL_INFO.name}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 max-w-md font-sans">
              Computer Science • Local AI & Systems • 3D/VFX • Worldbuilding & Research
            </p>
          </div>

          {/* Direct Email & Actions */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border text-foreground hover:bg-secondary text-xs font-semibold transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{PERSONAL_INFO.email}</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-secondary border border-border text-foreground hover:bg-secondary/80 transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Sub Footer */}
        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with React, TypeScript & Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
