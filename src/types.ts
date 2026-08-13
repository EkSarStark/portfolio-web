import type { ReactNode } from 'react';

export type ThemeMode = 'dark' | 'light' | 'obsidian';

export type DomainCategory = 
  | 'all'
  | 'programming'
  | 'linux'
  | 'ai'
  | '3d_vfx'
  | 'worldbuilding'
  | 'research';

export interface SkillCategory {
  id: string;
  title: string;
  domain: DomainCategory;
  iconName: string;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  domain: DomainCategory;
  summary: string;
  highlights: string[];
  technologies: string[];
  status: string;
  featured?: boolean;
}

export interface TimelineEra {
  id: string;
  eraName: string;
  timeRange: string;
  description: string;
  keyEvents: string[];
  relicsAndTech: string[];
}

export interface ResearchTopic {
  id: string;
  title: string;
  category: string;
  points: string[];
  iconName: string;
}

export interface TerminalLog {
  id: string;
  command: string;
  output: string | ReactNode;
  timestamp: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  domain: DomainCategory;
  description: string;
  imageUrl: string;
  credentialUrl?: string;
  credentialId?: string;
  skillsValidated?: string[];
  isCustom?: boolean;
}

