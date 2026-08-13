import React from 'react';
import { ProjectItem } from '../types';
import { X, Sparkles, CheckCircle2, Terminal, ArrowRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-background border border-border/80 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-secondary/80 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badges */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono">
            {project.status}
          </span>
          <span className="px-3 py-1 rounded-full bg-secondary border border-border/80 text-muted-foreground text-xs font-mono">
            {project.domain}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-foreground tracking-tight">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm font-mono text-emerald-700 dark:text-emerald-400 mt-1">
          {project.subtitle}
        </p>

        {/* Summary */}
        <div className="mt-5 p-4 rounded-xl bg-secondary/30 border border-border/80">
          <h4 className="text-xs font-mono uppercase text-muted-foreground mb-1">Project Summary</h4>
          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
            {project.summary}
          </p>
        </div>

        {/* Highlights */}
        <div className="mt-6">
          <h4 className="text-xs font-mono uppercase text-muted-foreground mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            Key Technical & Architectural Highlights
          </h4>
          <ul className="space-y-2.5">
            {project.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-6">
          <h4 className="text-xs font-mono uppercase text-muted-foreground mb-2">Technologies & Environment</h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-secondary border border-border/80 text-xs font-mono text-foreground/90"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive Quick Action */}
        <div className="mt-8 pt-5 border-t border-border/80 flex items-center justify-between">
          <span className="text-xs font-mono text-muted-foreground">
            Sai Deepak Sarma Project Portfolio
          </span>
          {project.id === 'serix' ? (
            <a
              href="#serix-terminal"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 text-slate-950 font-semibold text-xs hover:bg-emerald-400 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch SERIX CLI</span>
            </a>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 border border-border/80 text-xs text-foreground transition-colors font-medium"
            >
              <span>Close View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

