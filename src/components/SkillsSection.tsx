import React, { useState } from 'react';
import { SKILL_CATEGORIES, ALL_TOOLS } from '../data/portfolioData';
import { DomainCategory } from '../types';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Box, 
  BookOpen, 
  FlaskConical, 
  Search, 
  Wrench, 
  Check, 
  ListFilter
} from 'lucide-react';

interface SkillsSectionProps {
  selectedDomain: DomainCategory;
  onSelectDomain: (domain: DomainCategory) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  selectedDomain,
  onSelectDomain,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedTools, setCopiedTools] = useState(false);

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'programming': return Code2;
      case 'linux': return Terminal;
      case 'ai': return Cpu;
      case '3d_vfx': return Box;
      case 'worldbuilding': return BookOpen;
      case 'research': return FlaskConical;
      default: return Wrench;
    }
  };

  const domainTabs: { id: DomainCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'programming', label: 'Programming' },
    { id: 'linux', label: 'Linux & Systems' },
    { id: 'ai', label: 'AI & Local LLMs' },
    { id: '3d_vfx', label: '3D & VFX' },
    { id: 'worldbuilding', label: 'Worldbuilding' },
    { id: 'research', label: 'Research' },
  ];

  const filteredCategories = SKILL_CATEGORIES.filter((cat) => {
    const matchesDomain = selectedDomain === 'all' || cat.domain === selectedDomain;
    const matchesSearch = 
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.bullets.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDomain && matchesSearch;
  });

  const handleCopyTools = () => {
    navigator.clipboard.writeText(ALL_TOOLS.join(', '));
    setCopiedTools(true);
    setTimeout(() => setCopiedTools(false), 2000);
  };

  return (
    <section id="skills" className="py-16 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Code2 className="w-4 h-4 text-emerald-500" />
              <h2 className="text-xs font-mono tracking-wider text-emerald-500 font-semibold uppercase">
                Technical Capabilities
              </h2>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Skills & Development Stack
            </h3>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter skills (CUDA, React, Blender)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-full bg-secondary/80 border border-border/80 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/40"
            />
          </div>
        </div>

        {/* Domain Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <span className="text-xs font-mono text-muted-foreground mr-1 flex items-center gap-1 shrink-0">
            <ListFilter className="w-3.5 h-3.5" /> Filter:
          </span>
          {domainTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectDomain(tab.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all ${
                selectedDomain === tab.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredCategories.map((cat) => {
            const Icon = getDomainIcon(cat.domain);
            return (
              <div
                key={cat.id}
                className="p-6 rounded-2xl bg-secondary/30 border border-border/80 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base text-foreground">
                      {cat.title}
                    </h4>
                  </div>

                  <ul className="space-y-2">
                    {cat.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Complete Tools & Technologies Strip */}
        <div className="mt-8 p-6 rounded-2xl bg-secondary/20 border border-border/80">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-emerald-500" />
              <h4 className="text-xs font-semibold font-mono text-foreground uppercase tracking-wider">
                Tools & Technologies Stack
              </h4>
            </div>

            <button
              onClick={handleCopyTools}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary hover:bg-accent border border-border/80 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {copiedTools ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
              <span>{copiedTools ? 'Copied Stack' : 'Copy All Tools'}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {ALL_TOOLS.map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 rounded-md bg-secondary/80 border border-border/60 text-xs font-mono text-foreground/80 hover:border-emerald-500/30 transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

