import React, { useState } from 'react';
import { TIMELINE_ERAS } from '../data/portfolioData';
import { BookOpen, Sparkles, Clock, ShieldAlert, Key, Globe, ArrowRight } from 'lucide-react';

export const TimelineCanvas: React.FC = () => {
  const [selectedEraId, setSelectedEraId] = useState<string>(TIMELINE_ERAS[0].id);

  const selectedEra = TIMELINE_ERAS.find((e) => e.id === selectedEraId) || TIMELINE_ERAS[0];

  return (
    <section id="worldbuilding" className="py-16 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <h2 className="text-xs font-mono tracking-wider text-emerald-500 font-semibold uppercase">
                Narrative Systems
              </h2>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Omnian Chronicles — Timeline Canvas
            </h3>
          </div>

          <div className="px-3 py-1 rounded-full bg-secondary/80 border border-border/80 text-xs font-mono text-muted-foreground flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-emerald-500" />
            <span>Multi-Era Chronology</span>
          </div>
        </div>

        {/* Timeline Canvas Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Timeline Eras Navigation Bar */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="text-xs font-mono text-muted-foreground mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              Chronological Eras:
            </div>

            {TIMELINE_ERAS.map((era, index) => {
              const isSelected = era.id === selectedEraId;
              return (
                <button
                  key={era.id}
                  onClick={() => setSelectedEraId(era.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-start gap-3 ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500/50 text-foreground shadow-sm'
                      : 'bg-secondary/30 border-border/80 text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5 ${
                    isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-secondary border border-border/80'
                  }`}>
                    0{index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs sm:text-sm text-foreground truncate">
                        {era.eraName}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 mt-0.5">
                      {era.timeRange}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Era Detail Display */}
          <div className="lg:col-span-8 p-6 sm:p-7 rounded-2xl bg-secondary/30 border border-border/80 flex flex-col justify-between">
            <div>
              
              {/* Era Badge */}
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold">
                  {selectedEra.timeRange}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  Historical Node
                </span>
              </div>

              {/* Title */}
              <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                {selectedEra.eraName}
              </h4>

              {/* Description */}
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5 font-sans">
                {selectedEra.description}
              </p>

              {/* Key Historical Events */}
              <div className="space-y-3 mb-5">
                <h5 className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-500" />
                  Key Historical Events
                </h5>

                <div className="space-y-2">
                  {selectedEra.keyEvents.map((evt, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-background/80 border border-border/60 flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{evt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relics & Technology Systems */}
              <div>
                <h5 className="text-xs font-mono text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-emerald-500" />
                  Preserved Relics & Technological Anchors
                </h5>

                <div className="flex flex-wrap gap-1.5">
                  {selectedEra.relicsAndTech.map((relic) => (
                    <span
                      key={relic}
                      className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono"
                    >
                      {relic}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Worldbuilding Philosophy Note */}
            <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>Causal Narrative Integrity Verified</span>
              <a
                href="#projects"
                className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>View Canvas Project</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

