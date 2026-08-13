import React, { useState, useEffect } from 'react';
import { SKILL_CATEGORIES, PROJECTS, RESEARCH_TOPICS, PERSONAL_INFO } from '../data/portfolioData';
import { Search, X, Code2, Box, FlaskConical, ArrowRight, Award } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (href: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectSection,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          const trigger = document.getElementById('cmd-k-trigger');
          if (trigger) trigger.click();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchLower = query.toLowerCase().trim();

  const matchingSkills = SKILL_CATEGORIES.filter(s => 
    s.title.toLowerCase().includes(searchLower) ||
    s.bullets.some(b => b.toLowerCase().includes(searchLower))
  );

  const matchingProjects = PROJECTS.filter(p =>
    p.title.toLowerCase().includes(searchLower) ||
    p.subtitle.toLowerCase().includes(searchLower) ||
    p.summary.toLowerCase().includes(searchLower) ||
    p.technologies.some(t => t.toLowerCase().includes(searchLower))
  );

  const matchingResearch = RESEARCH_TOPICS.filter(r =>
    r.title.toLowerCase().includes(searchLower) ||
    r.points.some(p => p.toLowerCase().includes(searchLower))
  );

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-background border border-border/80 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden text-foreground relative font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-border/80 flex items-center gap-3">
          <Search className="w-4 h-4 text-emerald-500 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search skills, projects, tools, or research..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[380px] overflow-y-auto space-y-4 text-xs font-mono">
          
          {/* Quick Navigation Links */}
          {!query && (
            <div>
              <div className="text-[10px] uppercase text-muted-foreground mb-2 font-mono">Quick Navigation</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { onSelectSection('profile'); onClose(); }}
                  className="p-3 rounded-xl bg-secondary/50 hover:bg-emerald-500/10 text-left hover:text-emerald-400 flex items-center justify-between border border-border/60 transition-colors"
                >
                  <span>Profile & Direction</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { onSelectSection('skills'); onClose(); }}
                  className="p-3 rounded-xl bg-secondary/50 hover:bg-emerald-500/10 text-left hover:text-emerald-400 flex items-center justify-between border border-border/60 transition-colors"
                >
                  <span>Skills & Stack</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { onSelectSection('projects'); onClose(); }}
                  className="p-3 rounded-xl bg-secondary/50 hover:bg-emerald-500/10 text-left hover:text-emerald-400 flex items-center justify-between border border-border/60 transition-colors"
                >
                  <span>Projects Showcase</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { onSelectSection('certificates'); onClose(); }}
                  className="p-3 rounded-xl bg-secondary/50 hover:bg-emerald-500/10 text-left hover:text-emerald-400 flex items-center justify-between border border-border/60 transition-colors"
                >
                  <span>Certificates & Credentials</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { onSelectSection('serix-terminal'); onClose(); }}
                  className="p-3 rounded-xl bg-secondary/50 hover:bg-emerald-500/10 text-left hover:text-emerald-400 flex items-center justify-between border border-border/60 transition-colors"
                >
                  <span>SERIX AI Terminal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <>
              {/* Projects */}
              {matchingProjects.length > 0 && (
                <div>
                  <div className="text-[10px] uppercase text-emerald-400 font-bold mb-1 flex items-center gap-1">
                    <Box className="w-3.5 h-3.5" /> Projects ({matchingProjects.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingProjects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => { onSelectSection('projects'); onClose(); }}
                        className="w-full text-left p-2.5 rounded-xl bg-secondary/40 hover:bg-emerald-500/10 hover:text-emerald-400 flex items-center justify-between border border-border/60 transition-colors"
                      >
                        <div>
                          <span className="font-semibold text-foreground block">{p.title}</span>
                          <span className="text-[11px] text-muted-foreground block">{p.subtitle}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {matchingSkills.length > 0 && (
                <div>
                  <div className="text-[10px] uppercase text-emerald-400 font-bold mb-1 flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5" /> Skills ({matchingSkills.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingSkills.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { onSelectSection('skills'); onClose(); }}
                        className="w-full text-left p-2.5 rounded-xl bg-secondary/40 hover:bg-emerald-500/10 hover:text-emerald-400 flex items-center justify-between border border-border/60 transition-colors"
                      >
                        <span className="font-semibold text-foreground">{s.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Research */}
              {matchingResearch.length > 0 && (
                <div>
                  <div className="text-[10px] uppercase text-emerald-400 font-bold mb-1 flex items-center gap-1">
                    <FlaskConical className="w-3.5 h-3.5" /> Research Topics
                  </div>
                  <div className="space-y-1.5">
                    {matchingResearch.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => { onSelectSection('research'); onClose(); }}
                        className="w-full text-left p-2.5 rounded-xl bg-secondary/40 hover:bg-emerald-500/10 hover:text-emerald-400 flex items-center justify-between border border-border/60 transition-colors"
                      >
                        <span className="font-semibold text-foreground">{r.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchingProjects.length === 0 && matchingSkills.length === 0 && matchingResearch.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  No direct results found for "{query}". Try searching "CUDA", "Blender", "SERIX", or "C++".
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3 bg-secondary border-t border-border/80 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span>{PERSONAL_INFO.name} — Search</span>
          <span>Press ESC to close</span>
        </div>

      </div>
    </div>
  );
};

