import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { DomainCategory, ProjectItem } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Box, Sparkles, ArrowUpRight, Cpu, BookOpen, Film, Layers, Code2 } from 'lucide-react';

interface ProjectsSectionProps {
  selectedDomain: DomainCategory;
  onSelectDomain: (domain: DomainCategory) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  selectedDomain,
  onSelectDomain,
}) => {
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  const getDomainBadgeIcon = (domain: DomainCategory) => {
    switch (domain) {
      case 'ai': return Cpu;
      case 'worldbuilding': return BookOpen;
      case '3d_vfx': return Film;
      case 'programming': return Code2;
      default: return Layers;
    }
  };

  const filteredProjects = PROJECTS.filter((proj) => {
    if (selectedDomain === 'all') return true;
    return proj.domain === selectedDomain;
  });

  return (
    <section id="projects" className="py-16 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Box className="w-4 h-4 text-emerald-500" />
              <h2 className="text-xs font-mono tracking-wider text-emerald-500 font-semibold uppercase">
                Portfolio
              </h2>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Selected Projects & Systems
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span>{filteredProjects.length} Projects</span>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((project) => {
            const Icon = getDomainBadgeIcon(project.domain);
            return (
              <div
                key={project.id}
                onClick={() => setActiveProjectModal(project)}
                className="group cursor-pointer p-6 rounded-2xl bg-secondary/30 border border-border/80 hover:border-emerald-500/40 hover:bg-secondary/50 transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
              >
                {project.featured && (
                  <div className="absolute top-0 right-0 bg-emerald-500/15 border-b border-l border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-semibold px-2.5 py-0.5 rounded-bl-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Featured
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {project.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h4>

                  <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400 mt-1 mb-2.5">
                    {project.subtitle}
                  </p>

                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                    {project.summary}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-border/60">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-background/80 border border-border/60 text-[11px] font-mono text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-emerald-500 font-semibold">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />

      </div>
    </section>
  );
};

