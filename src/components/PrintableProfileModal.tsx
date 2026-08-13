import React, { useEffect, useState } from 'react';
import { 
  PERSONAL_INFO, 
  STRENGTHS, 
  SKILL_CATEGORIES, 
  ALL_TOOLS, 
  PROJECTS, 
  INITIAL_CERTIFICATES, 
  TIMELINE_ERAS, 
  RESEARCH_TOPICS 
} from '../data/portfolioData';
import { CertificateItem } from '../types';
import { X, Printer, Download, Sparkles, CheckCircle2 } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'sai_portfolio_certificates_v1';

interface PrintableProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableProfileModal: React.FC<PrintableProfileModalProps> = ({ isOpen, onClose }) => {
  const [certificates, setCertificates] = useState<CertificateItem[]>(INITIAL_CERTIFICATES);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCertificates(parsed);
          }
        }
      } catch (e) {
        console.error('Failed to parse local certificates for PDF resume:', e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white text-slate-900 border border-slate-300 rounded-3xl max-w-4xl w-full p-6 sm:p-10 shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto font-sans print:m-0 print:p-0 print:max-h-none print:shadow-none print:border-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Action Header (Hidden on Print) */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md pb-4 pt-1 border-b border-slate-200 flex items-center justify-between mb-8 print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center font-mono font-bold text-xs">
              PDF
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Full Portfolio Resume Document</h3>
              <p className="text-[11px] text-slate-500 font-mono">Complete website details & credentials ready for export</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all shadow-md hover:scale-[1.02]"
              id="print-pdf-resume-btn"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Close Preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRINTABLE RESUME DOCUMENT CONTENT */}
        <div className="space-y-8 text-slate-900 leading-relaxed text-sm print:space-y-6">
          
          {/* HEADER / CONTACT INFO */}
          <div className="border-b-2 border-slate-900 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans uppercase">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-emerald-700 font-mono mt-1">
                  {PERSONAL_INFO.subtitle}
                </p>
              </div>

              <div className="text-xs font-mono text-slate-600 space-y-0.5 sm:text-right">
                <div>Email: <span className="font-semibold text-slate-900">{PERSONAL_INFO.email}</span></div>
                <div>GitHub: <span className="font-semibold text-slate-900">github.com/sai-deepak</span></div>
                <div>Location: <span className="font-semibold text-slate-900">India</span></div>
              </div>
            </div>
          </div>

          {/* EXECUTIVE PROFILE */}
          <section>
            <h2 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2.5 flex items-center gap-1.5">
              <span>01. EXECUTIVE PROFILE</span>
            </h2>
            <p className="text-slate-800 text-sm leading-relaxed">
              {PERSONAL_INFO.profileText}
            </p>
          </section>

          {/* TECHNICAL SKILLS BREAKDOWN */}
          <section>
            <h2 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
              02. TECHNICAL SKILLS & CAPABILITIES
            </h2>
            
            <div className="space-y-4">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.id} className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-xs font-mono text-slate-900 uppercase mb-1.5">
                    • {cat.title}
                  </h3>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700 text-xs">
                    {cat.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* TOOLS & TECHNOLOGIES */}
          <section>
            <h2 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2.5">
              03. TOOLS, FRAMEWORKS & HARDWARE STACK
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-slate-800">
              {ALL_TOOLS.map((tool) => (
                <div key={tool} className="bg-slate-100/70 px-2.5 py-1 rounded border border-slate-200">
                  ✓ {tool}
                </div>
              ))}
            </div>
          </section>

          {/* SELECTED PROJECTS */}
          <section>
            <h2 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3">
              04. SELECTED PROJECTS & ENGINEERING SYSTEMS
            </h2>
            <div className="space-y-3">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-bold text-sm text-slate-900">{proj.title}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {proj.domain.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed mb-2">
                    {proj.summary}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* VERIFIED CERTIFICATIONS & CREDENTIALS */}
          <section className="print-break-inside-avoid">
            <h2 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-3 flex items-center justify-between">
              <span>05. VERIFIED CERTIFICATIONS & CREDENTIALS</span>
              <span className="text-[10px] text-slate-500 font-normal">({certificates.length} Verified Cards)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {certificates.map((cert) => (
                <div 
                  key={cert.id} 
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 print-break-inside-avoid flex flex-col justify-between space-y-2.5"
                >
                  <div className="space-y-2">
                    {/* Certificate Thumbnail Preview Image */}
                    <div className="w-full h-28 rounded-lg overflow-hidden bg-slate-950 border border-slate-300 flex items-center justify-center p-1">
                      <img 
                        src={cert.imageUrl} 
                        alt={cert.title}
                        className="w-full h-full object-contain rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180" fill="%230f172a"><rect width="100%" height="100%" fill="%230f172a"/><text x="50%" y="50%" fill="%2394a3b8" font-size="12" text-anchor="middle" font-family="sans-serif">Certificate Record</text></svg>';
                        }}
                      />
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-xs text-slate-900 leading-snug">
                          {cert.title}
                        </h3>
                        <p className="text-[11px] font-mono text-emerald-800 font-semibold mt-0.5">
                          {cert.issuer}
                        </p>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200/80 text-slate-700 shrink-0">
                        {cert.date}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-700 leading-relaxed line-clamp-3">
                      {cert.description}
                    </p>
                  </div>

                  {/* Skills Validated & Credential Details */}
                  <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-1">
                    {cert.skillsValidated && cert.skillsValidated.length > 0 ? (
                      <div className="flex flex-wrap gap-1 text-[9px] font-mono">
                        {cert.skillsValidated.slice(0, 4).map((skill, sIdx) => (
                          <span key={sIdx} className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : <div />}

                    {cert.credentialId && (
                      <div className="text-[9px] font-mono text-slate-500">
                        ID: {cert.credentialId}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI & TERMINAL ARCHITECTURE */}
          <section>
            <h2 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2.5">
              06. SERIX LOCAL AI ARCHITECTURE & TOOLING
            </h2>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs space-y-2">
              <div className="text-emerald-400 font-bold">$ serix --status</div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Offline local LLM assistant featuring system status monitoring, file operations, bash script generation, 
                and procedural 3D Geometry Nodes helper scripts. Standardized for air-gapped local execution via Ollama/llama.cpp APIs.
              </p>
            </div>
          </section>

          {/* SCIENTIFIC RESEARCH & WORLDBUILDING */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Research */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
              <h3 className="font-bold text-xs font-mono text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2">
                07. SCIENTIFIC RESEARCH INTERESTS
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {RESEARCH_TOPICS.map((topic) => (
                  <li key={topic.id}>
                    <strong className="text-slate-900">• {topic.title}:</strong> {topic.category}
                  </li>
                ))}
              </ul>
            </div>

            {/* Worldbuilding */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
              <h3 className="font-bold text-xs font-mono text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2">
                08. OMNIAN CHRONICLES CANON
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {TIMELINE_ERAS.map((era) => (
                  <li key={era.id}>
                    <strong className="text-slate-900">• {era.eraName}</strong> ({era.timeRange}): {era.description}
                  </li>
                ))}
              </ul>
            </div>

          </section>

          {/* CREATIVE & TECHNICAL STRENGTHS */}
          <section>
            <h2 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2.5">
              09. TECHNICAL PHILOSOPHY & STRENGTHS
            </h2>
            <ul className="list-disc list-outside pl-4 space-y-1 text-slate-800 text-xs">
              {STRENGTHS.map((str, i) => (
                <li key={i}>{str}</li>
              ))}
            </ul>
          </section>

          {/* FOOTER DISCLAIMER & DIRECTION */}
          <section className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-xs">
            <h2 className="font-bold font-mono text-slate-900 uppercase mb-1">
              DEVELOPMENT DIRECTION
            </h2>
            <p className="text-slate-700 leading-relaxed">
              {PERSONAL_INFO.currentDirection}
            </p>
            <div className="text-[10px] font-mono text-slate-500 mt-2">
              Generated directly from full portfolio system state • {PERSONAL_INFO.name} ({new Date().getFullYear()})
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
