import React from 'react';
import { RESEARCH_TOPICS } from '../data/portfolioData';
import { FlaskConical, Dna, Atom, Network, CheckCircle2 } from 'lucide-react';

export const ResearchSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Dna': return Dna;
      case 'Atom': return Atom;
      case 'Network': return Network;
      default: return FlaskConical;
    }
  };

  return (
    <section id="research" className="py-16 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-1.5">
          <FlaskConical className="w-4 h-4 text-emerald-500" />
          <h2 className="text-xs font-mono tracking-wider text-emerald-500 font-semibold uppercase">
            Interdisciplinary Focus
          </h2>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-8">
          Research & Scientific Interests
        </h3>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {RESEARCH_TOPICS.map((topic) => {
            const Icon = getIcon(topic.iconName);
            return (
              <div
                key={topic.id}
                className="p-6 rounded-2xl bg-secondary/30 border border-border/80 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-foreground leading-snug">
                        {topic.title}
                      </h4>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {topic.category}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5">
                    {topic.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

