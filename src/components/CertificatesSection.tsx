import React, { useState, useEffect, useRef } from 'react';
import { CertificateItem, DomainCategory } from '../types';
import { INITIAL_CERTIFICATES } from '../data/portfolioData';
import { 
  Award, 
  Upload, 
  Plus, 
  Image as ImageIcon, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  Eye, 
  X, 
  Check, 
  ExternalLink,
  RotateCcw,
  Sparkles
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'sai_portfolio_certificates_v1';

export const CertificatesSection: React.FC = () => {
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [filterDomain, setFilterDomain] = useState<DomainCategory>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedCertForPreview, setSelectedCertForPreview] = useState<CertificateItem | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [date, setDate] = useState('');
  const [domain, setDomain] = useState<DomainCategory>('programming');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [formError, setFormError] = useState('');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCertificates(parsed);
          return;
        }
      }
    } catch (e) {
      console.error('Failed to parse stored certificates:', e);
    }
    setCertificates(INITIAL_CERTIFICATES);
  }, []);

  const saveCertificates = (updatedCerts: CertificateItem[]) => {
    setCertificates(updatedCerts);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCerts));
    } catch (e) {
      console.error('Failed to save certificates:', e);
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const amount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  const handleFileChange = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file (PNG, JPG, WEBP, or SVG).');
      return;
    }
    setFormError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) setImageUrl(result);
    };
    reader.onerror = () => setFormError('Failed to load image.');
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !issuer.trim() || !description.trim() || !imageUrl) {
      setFormError('Please fill in the title, issuer, description, and upload a certificate image.');
      return;
    }

    const skillsArray = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newCert: CertificateItem = {
      id: `cert-custom-${Date.now()}`,
      title: title.trim(),
      issuer: issuer.trim(),
      date: date.trim() || new Date().getFullYear().toString(),
      domain,
      description: description.trim(),
      imageUrl,
      credentialUrl: credentialUrl.trim() || undefined,
      credentialId: credentialId.trim() || undefined,
      skillsValidated: skillsArray.length > 0 ? skillsArray : undefined,
      isCustom: true,
    };

    const updated = [newCert, ...certificates];
    saveCertificates(updated);
    resetForm();
    setIsUploadModalOpen(false);

    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const resetForm = () => {
    setTitle('');
    setIssuer('');
    setDate('');
    setDomain('programming');
    setDescription('');
    setImageUrl('');
    setCredentialUrl('');
    setCredentialId('');
    setSkillsInput('');
    setFormError('');
  };

  const handleDeleteCertificate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = certificates.filter((c) => c.id !== id);
    saveCertificates(filtered);
    if (selectedCertForPreview?.id === id) {
      setSelectedCertForPreview(null);
    }
  };

  const handleResetDefaults = () => {
    saveCertificates(INITIAL_CERTIFICATES);
  };

  const filteredCertificates = certificates.filter((cert) => {
    if (filterDomain === 'all') return true;
    return cert.domain === filterDomain;
  });

  const getDomainLabel = (dom: DomainCategory) => {
    switch (dom) {
      case 'programming': return 'Engineering';
      case 'linux': return 'Linux';
      case 'ai': return 'AI & ML';
      case '3d_vfx': return '3D CGI';
      case 'research': return 'Research';
      default: return 'General';
    }
  };

  return (
    <section id="certificates" className="py-20 sm:py-28 border-b border-border/40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Minimalist Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-muted-foreground uppercase mb-3">
              03 • Credentials & Achievements
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Certifications
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl leading-relaxed">
              Verified technical credentials spanning systems, artificial intelligence, geometry nodes, and CS algorithms.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                resetForm();
                setIsUploadModalOpen(true);
              }}
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold transition-all hover:opacity-90 shadow-sm"
              id="upload-cert-btn"
            >
              <Upload className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
              <span>Upload Certificate</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="p-2 rounded-full bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground text-xs transition-colors"
              title="Reset defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Minimalist Segment Control & Scroll Arrows */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All' },
              { id: 'programming', label: 'Engineering' },
              { id: 'linux', label: 'Linux' },
              { id: 'ai', label: 'AI & ML' },
              { id: '3d_vfx', label: '3D CGI' },
              { id: 'research', label: 'Research' },
            ].map((tab) => {
              const isActive = filterDomain === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterDomain(tab.id as DomainCategory)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-foreground text-background font-semibold shadow-xs'
                      : 'bg-secondary/40 hover:bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => handleScroll('left')}
              className="p-2 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-2 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Smooth Chill Cards Container */}
        {filteredCertificates.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-secondary/20 border border-dashed border-border/60">
            <Award className="w-8 h-8 text-muted-foreground/60 mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">No certificates in this category</p>
            <button
              onClick={() => setFilterDomain('all')}
              className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
            >
              Show all certificates
            </button>
          </div>
        ) : (
          <div 
            ref={scrollContainerRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-0.5 focus:outline-none w-full max-w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCertForPreview(cert)}
                className="group cursor-pointer w-[280px] sm:w-[340px] max-w-[85vw] flex-shrink-0 snap-start rounded-3xl bg-secondary/30 border border-border/60 hover:border-border hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
              >
                {/* Minimalist Image Preview */}
                <div className="relative aspect-[16/10] w-full bg-zinc-950 overflow-hidden">
                  <img 
                    src={cert.imageUrl} 
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" fill="%2318181b"><rect width="100%" height="100%" fill="%2318181b"/><text x="50%" y="50%" fill="%2371717a" font-size="14" text-anchor="middle" font-family="sans-serif">Certificate Preview</text></svg>';
                    }}
                  />

                  {/* Clean Domain Tag */}
                  <div className="absolute top-3.5 left-3.5 bg-black/50 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] tracking-wide px-2.5 py-1 rounded-full">
                    {getDomainLabel(cert.domain)}
                  </div>

                  {/* Quick Delete for Custom Certs */}
                  {cert.isCustom && (
                    <button
                      onClick={(e) => handleDeleteCertificate(cert.id, e)}
                      className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-black/60 hover:bg-red-600 text-white transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete certificate"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Minimalist Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-2">
                      <span className="truncate max-w-[180px] font-medium text-foreground/80">{cert.issuer}</span>
                      <span>{cert.date}</span>
                    </div>

                    <h3 className="font-bold text-base text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
                      {cert.title}
                    </h3>

                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                      {cert.description}
                    </p>
                  </div>

                  {/* Skills / Action link */}
                  <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                    {cert.skillsValidated && cert.skillsValidated.length > 0 ? (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {cert.skillsValidated.slice(0, 3).map((skill, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : <div />}

                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium group-hover:underline flex items-center gap-1 ml-auto">
                      View
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Clean Add Card */}
            <div
              onClick={() => {
                resetForm();
                setIsUploadModalOpen(true);
              }}
              className="cursor-pointer w-[280px] sm:w-[320px] flex-shrink-0 snap-start rounded-3xl bg-secondary/20 border border-dashed border-border/80 hover:border-foreground/40 transition-all duration-300 p-6 flex flex-col items-center justify-center text-center group min-h-[340px]"
            >
              <div className="w-10 h-10 rounded-full bg-secondary border border-border/60 flex items-center justify-center text-foreground mb-3 group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5" />
              </div>
              <p className="font-semibold text-sm text-foreground">Upload Certificate</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-[180px]">
                Add custom PNG credentials with description.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* ULTRA-MINIMAL UPLOAD MODAL */}
      {isUploadModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsUploadModalOpen(false)}
        >
          <div 
            className="bg-background border border-border/80 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-6 text-foreground font-sans max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/40">
              <div>
                <h3 className="font-bold text-lg tracking-tight text-foreground">Upload Certificate PNG</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Add a new verified credential card</p>
              </div>

              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddCertificate} className="space-y-4">
              
              {/* Dropzone */}
              <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase mb-1.5">
                  Certificate Image (PNG / JPG) *
                </label>
                
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`cursor-pointer border border-dashed rounded-2xl p-5 text-center transition-all ${
                    dragActive
                      ? 'border-foreground bg-secondary/80'
                      : imageUrl
                      ? 'border-emerald-500/40 bg-emerald-500/5'
                      : 'border-border hover:border-foreground/40 bg-secondary/20'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />

                  {imageUrl ? (
                    <div className="space-y-2">
                      <div className="relative h-28 w-full rounded-xl overflow-hidden bg-zinc-950">
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        <Check className="w-3.5 h-3.5" />
                        <span>PNG Loaded</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImageUrl('');
                          }}
                          className="ml-2 text-muted-foreground hover:text-foreground underline text-[11px]"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-2 flex flex-col items-center">
                      <ImageIcon className="w-6 h-6 text-muted-foreground mb-2" />
                      <p className="text-xs font-medium text-foreground">
                        Click or drag certificate PNG here
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Linux System Admin"
                    className="w-full px-3.5 py-2 rounded-xl bg-secondary/40 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">
                    Issuing Org *
                  </label>
                  <input
                    type="text"
                    required
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    placeholder="e.g. Linux Foundation"
                    className="w-full px-3.5 py-2 rounded-xl bg-secondary/40 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">
                    Year / Date
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="2026"
                    className="w-full px-3.5 py-2 rounded-xl bg-secondary/40 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value as DomainCategory)}
                    className="w-full px-3.5 py-2 rounded-xl bg-secondary/40 border border-border text-xs text-foreground focus:outline-none focus:border-foreground"
                  >
                    <option value="programming">Engineering</option>
                    <option value="linux">Linux</option>
                    <option value="ai">AI & ML</option>
                    <option value="3d_vfx">3D CGI</option>
                    <option value="research">Research</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of skills validated and key topics covered..."
                  className="w-full px-3.5 py-2 rounded-xl bg-secondary/40 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground uppercase mb-1">
                  Skills Validated (Comma separated)
                </label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="Ubuntu, Bash, Systemd"
                  className="w-full px-3.5 py-2 rounded-xl bg-secondary/40 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                />
              </div>

              <div className="pt-4 border-t border-border/40 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  Save
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* LIGHTBOX DETAIL PREVIEW */}
      {selectedCertForPreview && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedCertForPreview(null)}
        >
          <div 
            className="bg-background border border-border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-6 text-foreground font-sans max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
                Certificate Record
              </span>

              <button
                onClick={() => setSelectedCertForPreview(null)}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-border mb-6 flex items-center justify-center">
              <img 
                src={selectedCertForPreview.imageUrl} 
                alt={selectedCertForPreview.title}
                className="w-full max-h-[380px] object-contain p-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>{selectedCertForPreview.issuer}</span>
                <span>{selectedCertForPreview.date}</span>
              </div>

              <h2 className="text-xl font-bold text-foreground">
                {selectedCertForPreview.title}
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {selectedCertForPreview.description}
              </p>

              {selectedCertForPreview.skillsValidated && selectedCertForPreview.skillsValidated.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {selectedCertForPreview.skillsValidated.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-secondary text-foreground text-xs font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
