import React, { useState, useEffect } from 'react';
import { ThemeMode, DomainCategory } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProfileSection } from './components/ProfileSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { SerixTerminal } from './components/SerixTerminal';
import { TimelineCanvas } from './components/TimelineCanvas';
import { ResearchSection } from './components/ResearchSection';
import { CommandPalette } from './components/CommandPalette';
import { PrintableProfileModal } from './components/PrintableProfileModal';
import { Footer } from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [selectedDomain, setSelectedDomain] = useState<DomainCategory>('all');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  // Track scroll position for active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['profile', 'skills', 'projects', 'certificates', 'serix-terminal', 'worldbuilding', 'research'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update DOM body class when theme changes
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'obsidian', 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'obsidian') {
      document.documentElement.classList.add('dark', 'obsidian');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  const handleSelectDomain = (domain: string) => {
    setSelectedDomain(domain as DomainCategory);
    const skillsEl = document.getElementById('skills');
    if (skillsEl) {
      skillsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSectionFromCommand = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden relative font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-900 transition-colors duration-200 ${
      theme === 'light' 
        ? 'bg-white text-black' 
        : theme === 'obsidian' 
          ? 'bg-slate-950 text-slate-100' 
          : 'bg-zinc-950 text-zinc-100'
    }`}>
      
      {/* Sticky Top Navigation */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenPrintModal={() => setPrintModalOpen(true)}
        activeSection={activeSection}
      />

      {/* Hero Header Section */}
      <Hero
        onOpenPrintModal={() => setPrintModalOpen(true)}
        onSelectDomain={handleSelectDomain}
      />

      {/* Main Content Sections */}
      <main>
        {/* Profile & Current Direction */}
        <ProfileSection />

        {/* Technical & Creative Skills */}
        <SkillsSection
          selectedDomain={selectedDomain}
          onSelectDomain={(dom) => setSelectedDomain(dom)}
        />

        {/* Selected Projects & Systems */}
        <ProjectsSection
          selectedDomain={selectedDomain}
          onSelectDomain={(dom) => setSelectedDomain(dom)}
        />

        {/* Certificates & Achievements */}
        <CertificatesSection />

        {/* Interactive SERIX AI Terminal Playground */}
        <SerixTerminal />

        {/* Omnian Chronicles Worldbuilding Canvas */}
        <TimelineCanvas />

        {/* Research & Scientific Interests */}
        <ResearchSection />
      </main>

      {/* Footer */}
      <Footer onOpenPrintModal={() => setPrintModalOpen(true)} />

      {/* Cmd+K Search Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectSection={handleSelectSectionFromCommand}
      />

      {/* PDF Summary Document Modal */}
      <PrintableProfileModal
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
      />

    </div>
  );
}
