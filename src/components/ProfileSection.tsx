import React from 'react';
import { PERSONAL_INFO, STRENGTHS } from '../data/portfolioData';
import { User, CheckCircle2, Compass, Layers, Mail } from 'lucide-react';

export const ProfileSection: React.FC = () => {
  return (
    <section id="profile" className="py-16 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-1.5">
          <User className="w-4 h-4 text-emerald-500" />
          <h2 className="text-xs font-mono tracking-wider text-emerald-500 font-semibold uppercase">
            About & Direction
          </h2>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Multidisciplinary Strengths & Strategic Focus
        </h3>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Direction & Overview */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Profile Overview Card */}
            <div className="p-6 rounded-2xl bg-secondary/30 border border-border/80 hover:border-emerald-500/30 transition-all">
              <h4 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-500" />
                Technical & Creative Profile
              </h4>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {PERSONAL_INFO.profileText}
              </p>
            </div>

            {/* Current Development Direction Card */}
            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <h4 className="text-base font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Current Focus & Projects
              </h4>
              <p className="mt-2.5 text-sm text-foreground/90 leading-relaxed font-sans">
                {PERSONAL_INFO.currentDirection}
              </p>
            </div>

            {/* Disclaimer / Context Note */}
            <div className="p-4 rounded-xl bg-secondary/20 border border-border/60 text-xs text-muted-foreground font-mono">
              <span className="text-emerald-500 font-semibold">Scope Note:</span> {PERSONAL_INFO.disclaimerNote}
            </div>

          </div>

          {/* Strengths List */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-secondary/30 border border-border/80 flex flex-col justify-between">
            <div>
              <h4 className="text-base font-semibold text-foreground mb-4">
                Working Style & Core Strengths
              </h4>
              
              <ul className="space-y-3">
                {STRENGTHS.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact Card */}
            <div className="mt-6 pt-5 border-t border-border/60 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono text-muted-foreground">Contact Email</div>
                <div className="text-xs font-semibold text-foreground">{PERSONAL_INFO.email}</div>
              </div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 text-xs font-medium transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Sai</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

