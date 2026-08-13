import React, { useState, useRef, useEffect } from 'react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';
import { Terminal, RefreshCw, Cpu, ShieldCheck, Sparkles, CornerDownLeft } from 'lucide-react';

interface TerminalLog {
  id: string;
  command: string;
  output: string | React.ReactNode;
  timestamp: string;
}

export const SerixTerminal: React.FC = () => {
  const [inputCommand, setInputCommand] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: 'init-1',
      command: 'serix --status',
      output: (
        <div className="space-y-1 text-xs font-mono">
          <div className="text-emerald-400 font-bold">
            [SERIX LOCAL AI CORE v2.4 ONLINE]
          </div>
          <div className="text-muted-foreground">
            Model: Qwen-2.5 / llama.cpp • Inference: CUDA GPU Offloaded • Mode: Local Offline Intelligence
          </div>
          <div className="text-foreground/90">
            Type <span className="text-emerald-400 font-semibold">help</span>, <span className="text-emerald-400 font-semibold">profile</span>, <span className="text-emerald-400 font-semibold">skills</span>, <span className="text-emerald-400 font-semibold">projects</span>, or ask SERIX anything about Sai Deepak Sarma.
          </div>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const handleCommand = async (cmdToRun?: string) => {
    const rawCmd = cmdToRun || inputCommand;
    if (!rawCmd.trim()) return;

    const trimmed = rawCmd.trim();
    setInputCommand('');

    const newLogId = `log-${Date.now()}`;
    const timeStr = new Date().toLocaleTimeString();

    // Command parser
    const cmdLower = trimmed.toLowerCase();

    if (cmdLower === 'clear' || cmdLower === 'cls') {
      setLogs([]);
      return;
    }

    setIsLoading(true);

    let resultOutput: React.ReactNode = '';

    if (cmdLower === 'help') {
      resultOutput = (
        <div className="space-y-1.5 text-xs font-mono">
          <div className="text-emerald-400 font-bold">AVAILABLE SERIX COMMANDS:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
            <div><span className="text-foreground font-semibold">serix --profile</span> : View Sai Deepak Sarma summary & direction</div>
            <div><span className="text-foreground font-semibold">serix --skills</span> : List technical & creative skills</div>
            <div><span className="text-foreground font-semibold">serix --projects</span> : List all projects (SERIX, Omnian, Nebulas, etc.)</div>
            <div><span className="text-foreground font-semibold">serix --worldbuilding</span> : View Omnian Chronicles details</div>
            <div><span className="text-foreground font-semibold">serix --research</span> : View scientific research interests</div>
            <div><span className="text-foreground font-semibold">serix --tools</span> : List all tools & software stack</div>
            <div><span className="text-foreground font-semibold">clear</span> : Clear terminal screen</div>
          </div>
          <div className="mt-2 text-foreground/80">
            Or ask any question directly, e.g., <span className="text-emerald-400">"What is Sai's experience in Blender?"</span>
          </div>
        </div>
      );
    } else if (cmdLower.includes('profile')) {
      resultOutput = (
        <div className="space-y-2 text-xs font-mono">
          <div className="text-emerald-400 font-bold">{PERSONAL_INFO.name}</div>
          <div className="text-muted-foreground">{PERSONAL_INFO.profileText}</div>
          <div className="text-foreground/90 font-sans mt-2 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <strong>Current Direction:</strong> {PERSONAL_INFO.currentDirection}
          </div>
        </div>
      );
    } else if (cmdLower.includes('skills')) {
      resultOutput = (
        <div className="space-y-2 text-xs font-mono">
          <div className="text-emerald-400 font-bold">SKILLS & CAPABILITIES OVERVIEW:</div>
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.id} className="p-2.5 bg-secondary/50 rounded-xl border border-border/80">
              <span className="text-foreground font-bold">{cat.title}:</span>
              <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-0.5">
                {cat.bullets.slice(0, 3).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    } else if (cmdLower.includes('projects')) {
      resultOutput = (
        <div className="space-y-2 text-xs font-mono">
          <div className="text-emerald-400 font-bold">SELECTED PROJECTS & CONCEPTS:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PROJECTS.map((p) => (
              <div key={p.id} className="p-2.5 bg-secondary/50 rounded-xl border border-border/80">
                <div className="text-foreground font-bold">{p.title}</div>
                <div className="text-emerald-400/80 text-[11px]">{p.subtitle}</div>
                <div className="text-muted-foreground text-[11px] mt-1 line-clamp-2">{p.summary}</div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (cmdLower.includes('worldbuilding') || cmdLower.includes('omnian')) {
      resultOutput = (
        <div className="space-y-2 text-xs font-mono">
          <div className="text-emerald-400 font-bold">OMNIAN CHRONICLES & WORLDBUILDING:</div>
          <p className="text-muted-foreground">
            Large-scale science-fiction novel/worldbuilding project with deep chronology, secret organizations, relics, scientific mythology, and multi-era storytelling.
          </p>
          <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-foreground">
            Features parallel historical timeline management, relic/anchor causality systems, and speculative evolutionary biology concepts.
          </div>
        </div>
      );
    } else if (cmdLower.includes('research')) {
      resultOutput = (
        <div className="space-y-2 text-xs font-mono">
          <div className="text-emerald-400 font-bold">RESEARCH & SCIENTIFIC INTERESTS:</div>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Genetics, synthetic biology, paleogenetics, paleogenomics, bioinformatics</li>
            <li>Cosmic physics, time theory, energy systems, speculative science for fiction</li>
            <li>Independent technical research connecting scientific concepts to creative software projects</li>
          </ul>
        </div>
      );
    } else {
      // General question answering
      try {
        const response = await fetch('/api/serix-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: trimmed }),
        });

        if (response.ok) {
          const data = await response.json();
          resultOutput = (
            <div className="text-xs font-mono text-foreground leading-relaxed whitespace-pre-wrap">
              {data.reply}
            </div>
          );
        } else {
          throw new Error('Local fallback');
        }
      } catch {
        // Intelligent local fallback matching PDF context
        resultOutput = (
          <div className="text-xs font-mono text-foreground leading-relaxed">
            <span className="text-emerald-400 font-semibold">[SERIX AI Response]</span>: Sai Deepak Sarma is a B.Tech Computer Science student specializing in local AI models (LM Studio, Qwen, llama.cpp, CUDA), Linux systems, 3D/VFX in Blender (Geometry Nodes, Cycles, compositing), creative writing & worldbuilding (*Omnian Chronicles*), and scientific research in paleogenomics and cosmic physics.
          </div>
        );
      }
    }

    setIsLoading(false);
    setLogs((prev) => [
      ...prev,
      {
        id: newLogId,
        command: trimmed,
        output: resultOutput,
        timestamp: timeStr,
      },
    ]);
  };

  const quickPrompts = [
    'serix --profile',
    'serix --skills',
    'serix --projects',
    'serix --worldbuilding',
    'What is SERIX concept?',
  ];

  return (
    <section id="serix-terminal" className="py-16 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Cpu className="w-4 h-4 text-emerald-500" />
              <h2 className="text-xs font-mono tracking-wider text-emerald-500 font-semibold uppercase">
                Interactive Assistant Concept
              </h2>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              SERIX Local AI Terminal Playground
            </h3>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Offline Intelligence • Local Model Concept</span>
          </div>
        </div>

        {/* Terminal Window Box */}
        <div className="rounded-2xl border border-border/80 bg-zinc-950/90 shadow-2xl overflow-hidden font-mono backdrop-blur-md">
          
          {/* Terminal Title Bar */}
          <div className="bg-zinc-900/90 px-4 py-3 border-b border-border/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/70"></div>
              <span className="ml-2 text-xs font-medium text-muted-foreground">
                serix-cli@local-node:~
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="hidden sm:inline-block text-emerald-400">
                ● CUDA GPU Active
              </span>
              <button
                onClick={() => setLogs([])}
                className="hover:text-foreground transition-colors flex items-center gap-1"
                title="Clear terminal"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Quick Command Chips */}
          <div className="bg-zinc-900/50 px-4 py-2 border-b border-border/40 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
            <span className="text-muted-foreground shrink-0 text-[11px]">Quick Exec:</span>
            {quickPrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleCommand(p)}
                className="px-2.5 py-1 rounded-full bg-secondary/60 hover:bg-emerald-500/20 hover:text-emerald-400 text-muted-foreground text-[11px] transition-colors shrink-0 border border-border/60"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Terminal Output Area */}
          <div className="p-4 sm:p-6 min-h-[300px] max-h-[440px] overflow-y-auto space-y-4 text-xs">
            {logs.map((log) => (
              <div key={log.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                  <span className="text-emerald-400">serix@sarma-pc:~$</span>
                  <span className="text-foreground">{log.command}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground/60">{log.timestamp}</span>
                </div>
                <div className="pl-3.5 border-l border-emerald-500/30 py-0.5">
                  {log.output}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-emerald-400 animate-pulse text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SERIX processing command via local pipeline...</span>
              </div>
            )}

            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand();
            }}
            className="bg-zinc-900/90 border-t border-border/80 px-4 py-3 flex items-center gap-2"
          >
            <span className="text-emerald-400 font-semibold shrink-0">serix &gt;</span>
            <input
              type="text"
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              placeholder="Type command or ask SERIX a question..."
              className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputCommand.trim() || isLoading}
              className="px-3.5 py-1.5 rounded-full bg-emerald-500 text-slate-950 font-semibold text-xs hover:bg-emerald-400 disabled:opacity-40 transition-colors flex items-center gap-1"
            >
              <span>Exec</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};

