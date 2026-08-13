import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  Terminal, 
  Search, 
  Sun, 
  Moon, 
  Sparkles, 
  Menu, 
  X, 
  FileText, 
  Code2, 
  Box, 
  BookOpen, 
  FlaskConical,
  User,
  Award
} from 'lucide-react';

interface NavbarProps {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  onOpenCommandPalette: () => void;
  onOpenPrintModal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  setTheme,
  onOpenCommandPalette,
  onOpenPrintModal,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Profile', href: '#profile', icon: User },
    { name: 'Skills', href: '#skills', icon: Code2 },
    { name: 'Projects', href: '#projects', icon: Box },
    { name: 'Certificates', href: '#certificates', icon: Award },
    { name: 'SERIX AI', href: '#serix-terminal', icon: Terminal },
    { name: 'Worldbuilding', href: '#worldbuilding', icon: BookOpen },
    { name: 'Research', href: '#research', icon: FlaskConical },
  ];

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('obsidian');
    else if (theme === 'obsidian') setTheme('light');
    else setTheme('dark');
  };

  const getThemeLabel = () => {
    if (theme === 'dark') return 'Dark';
    if (theme === 'obsidian') return 'OLED';
    return 'Light';
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-200 bg-background/80 border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <a 
          href="#top" 
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 font-mono text-xs font-semibold group-hover:scale-105 transition-transform">
            SD
          </div>
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight text-foreground text-sm group-hover:text-emerald-400 transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono tracking-wider hidden sm:inline-block">
              Developer & Researcher
            </span>
          </div>
        </a>

        {/* Desktop Nav Links Pill Bar */}
        <nav className="hidden md:flex items-center p-1 rounded-full bg-secondary/50 border border-border/80 gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-foreground text-background shadow-sm font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          
          {/* Quick Search Button (Cmd+K) */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/80 border border-border/80 text-xs text-muted-foreground hover:text-foreground hover:border-emerald-500/30 transition-all"
            title="Search portfolio (Cmd+K)"
            id="cmd-k-trigger"
          >
            <Search className="w-3.5 h-3.5 text-emerald-500" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-block text-[10px] font-mono bg-background/80 px-1.5 py-0.2 rounded border border-border">
              ⌘K
            </kbd>
          </button>

          {/* PDF Resume View Button */}
          <button
            onClick={onOpenPrintModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 text-xs font-medium transition-colors"
            title="View summary PDF"
            id="pdf-summary-trigger"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF Summary</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={cycleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 border border-border/80 text-xs font-medium text-foreground hover:border-emerald-500/40 transition-colors"
            title={`Current theme: ${getThemeLabel()}`}
            id="theme-toggle-btn"
          >
            {theme === 'light' && <Sun className="w-3.5 h-3.5 text-amber-500" />}
            {theme === 'dark' && <Moon className="w-3.5 h-3.5 text-blue-400" />}
            {theme === 'obsidian' && <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden lg:inline text-[11px] font-mono">{getThemeLabel()}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-secondary border border-border text-foreground hover:text-emerald-400 focus:outline-none"
            aria-label="Toggle Navigation Menu"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-lg px-4 pt-2 pb-4 space-y-2">
          <div className="grid grid-cols-2 gap-2 pt-1 pb-3 border-b border-border">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-secondary/50 hover:bg-emerald-500/10 hover:text-emerald-400 text-xs font-medium border border-border transition-colors"
                >
                  <Icon className="w-4 h-4 text-emerald-500" />
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPrintModal();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/30"
            >
              <FileText className="w-4 h-4" />
              <span>PDF Summary View</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

