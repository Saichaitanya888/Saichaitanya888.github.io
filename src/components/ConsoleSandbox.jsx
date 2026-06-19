import { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

export default function ConsoleSandbox() {
  const [activeTab, setActiveTab] = useState('siem'); // 'siem' or 'terminal'

  return (
    <section id="console" className="min-h-screen py-32 flex flex-col justify-center items-center">
      <ScrollReveal animation="fade-up" className="w-full max-w-3xl">
        <div className="mb-12 px-4 text-center md:text-left">
          <h2 className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-2">
            Interactive Zone
          </h2>
          <p className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
            System Console
          </p>
          <p className="text-neutral-400 text-sm md:text-base font-light mt-4 leading-relaxed font-sans">
            Explore a simulated threat mitigation workflow or run commands directly through the mock shell.
          </p>
        </div>
      </ScrollReveal>

      {/* Main Console Container */}
      <ScrollReveal animation="zoom-in" delay={150} className="w-full max-w-3xl px-4">
        <div className="w-full rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl relative z-10 flex flex-col h-[520px]">
          {/* Header Tab Bar */}
          <div className="flex items-center justify-between bg-neutral-900/60 px-4 border-b border-neutral-900">
            {/* Mock Windows Controls */}
            <div className="flex gap-1.5 py-3">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('siem')}
                className={`px-4 py-3 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'siem'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Threat Hunt (SIEM/SOAR)
              </button>
              <button
                onClick={() => setActiveTab('terminal')}
                className={`px-4 py-3 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'terminal'
                    ? 'border-cyan-500 text-cyan-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Dev Shell (CLI)
              </button>
            </div>
            <div className="w-14 hidden md:block"></div> {/* Spacer for symmetry */}
          </div>

          {/* Active Panel Viewport */}
          <div className="flex-1 p-5 overflow-hidden flex flex-col font-mono text-sm">
            {activeTab === 'siem' ? <SiemPanel /> : <TerminalPanel />}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ==========================================================================
   1. SIEM / SOAR Playbook Sandbox Panel
   ========================================================================== */
function SiemPanel() {
  const [logs, setLogs] = useState([
    '[10:24:01] Ingesting syslogs on node gcp-vm-01...',
    '[10:24:02] Firewall ACCEPT tcp 192.168.1.55:443 -> 10.0.0.4',
  ]);
  const [threatState, setThreatState] = useState('detected'); // 'detected', 'mitigating', 'secure'
  const [mitigationProgress, setMitigationProgress] = useState(0);
  const logContainerRef = useRef(null);

  const predefinedLogs = [
    '[10:24:03] SSH login attempt from 203.0.113.5: root - FAILED',
    '[10:24:04] SSH login attempt from 203.0.113.5: root - FAILED',
    '[10:24:05] SSH login attempt from 203.0.113.5: root - FAILED',
    '[10:24:05] [CRITICAL ALERT] Multiple SSH failures. Pattern matched: Brute Force Attempt (T1110)',
    '[10:24:06] Monitoring active threats... Host gcp-vm-01 remains under brute force injection.',
  ];

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Stream initial logs
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < predefinedLogs.length) {
        const nextLog = predefinedLogs[index];
        setLogs((prev) => [...prev, nextLog]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const runMitigation = () => {
    setThreatState('mitigating');
    setMitigationProgress(0);

    // Simulate progress bar
    let progress = 0;
    const timer = setInterval(() => {
      progress += 10;
      setMitigationProgress(progress);
      if (progress >= 100) {
        clearInterval(timer);
        // Append resolution logs
        setLogs((prev) => [
          ...prev,
          '[10:24:12] [SOAR] Init mitigation playbook: BLOCK_THREAT_IP',
          '[10:24:13] [SOAR] Tracing threat source node... Done.',
          '[10:24:14] [SOAR] Injecting target blocking rule into Google Cloud Armor...',
          '[10:24:15] [SOAR] Cloud Armor Blocklist updated. IP 203.0.113.5 is rejected.',
          '[10:24:16] [INFO] Connection terminated. Host gcp-vm-01 status: SECURE',
        ]);
        setThreatState('secure');
      }
    }, 300);
  };

  const resetPlaybook = () => {
    setLogs([
      '[10:24:01] Ingesting syslogs on node gcp-vm-01...',
      '[10:24:02] Firewall ACCEPT tcp 192.168.1.55:443 -> 10.0.0.4',
    ]);
    setThreatState('detected');
    setMitigationProgress(0);

    let index = 0;
    const interval = setInterval(() => {
      if (index < predefinedLogs.length) {
        const nextLog = predefinedLogs[index];
        setLogs((prev) => [...prev, nextLog]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Upper Status Panel */}
      <div className="flex justify-between items-center bg-neutral-900 border border-neutral-800/80 rounded-xl p-4 mb-4">
        <div>
          <p className="text-xs text-neutral-500 font-mono">INCIDENT MONITOR</p>
          <h4 className="text-sm font-semibold text-white mt-1">Brute-Force Intrusion (GCP Host)</h4>
        </div>
        <div>
          {threatState === 'detected' && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 animate-pulse">
              THREAT DETECTED
            </span>
          )}
          {threatState === 'mitigating' && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
              MITIGATING...
            </span>
          )}
          {threatState === 'secure' && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              SYSTEM SECURE
            </span>
          )}
        </div>
      </div>

      {/* Logs Viewport */}
      <div
        ref={logContainerRef}
        className="flex-1 bg-black rounded-xl p-4 border border-neutral-900/60 overflow-y-auto mb-4 text-xs md:text-sm text-neutral-300 space-y-1.5 scrollbar-thin scrollbar-thumb-neutral-900"
      >
        {logs.map((log, idx) => {
          let color = 'text-neutral-400';
          if (log.includes('[CRITICAL ALERT]')) color = 'text-red-400 font-bold';
          if (log.includes('[SOAR]')) color = 'text-cyan-400';
          if (log.includes('SYSTEM SECURE') || log.includes('status: SECURE')) color = 'text-emerald-400 font-bold';
          return (
            <p key={idx} className={color}>
              {log}
            </p>
          );
        })}
      </div>

      {/* Mitigation Action Bar */}
      <div>
        {threatState === 'detected' && (
          <button
            onClick={runMitigation}
            className="w-full relative group p-px font-semibold rounded-xl bg-neutral-900 border border-neutral-800 text-white cursor-pointer active:scale-95 transition-all duration-200"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 p-[1.5px] opacity-80 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative z-10 block px-6 py-3 rounded-xl bg-neutral-950 border border-neutral-900 text-red-400 hover:text-red-300 transition-colors">
              EXECUTE AUTOMATED SOAR MITIGATION
            </span>
          </button>
        )}

        {threatState === 'mitigating' && (
          <div className="w-full bg-neutral-900 rounded-xl p-3.5 border border-neutral-800 text-center">
            <div className="flex justify-between text-xs text-amber-400 font-mono mb-2">
              <span>ISOLATING SOURCE ATTACKER...</span>
              <span>{mitigationProgress}%</span>
            </div>
            <div className="w-full bg-neutral-950 rounded-full h-2 overflow-hidden border border-neutral-900">
              <div
                className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${mitigationProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {threatState === 'secure' && (
          <button
            onClick={resetPlaybook}
            className="w-full relative group p-px font-semibold rounded-xl bg-neutral-900 border border-neutral-800 text-white cursor-pointer active:scale-95 transition-all duration-200"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-[1px] opacity-50 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative z-10 block px-6 py-3 rounded-xl bg-neutral-950 border border-neutral-900 text-emerald-400 hover:text-emerald-300 transition-colors">
              RESET SANDBOX
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   2. Dev Shell CLI Terminal Panel
   ========================================================================== */
function TerminalPanel() {
  const [history, setHistory] = useState([
    { type: 'output', text: 'SaiOS v1.0.0 (Standard Kernel Build x86_64)' },
    { type: 'output', text: 'Type "help" for a list of available CLI commands.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const historyContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    if (historyContainerRef.current) {
      historyContainerRef.current.scrollTop = historyContainerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const command = inputVal.trim().toLowerCase();
    if (!command) return;

    // Add input to history
    setHistory((prev) => [...prev, { type: 'input', text: inputVal }]);

    let reply = [];
    switch (command) {
      case 'help':
        reply = [
          { type: 'output', text: 'Available commands:' },
          { type: 'output', text: '  about      - Display brief bio overview.' },
          { type: 'output', text: '  skills     - Render technical competencies.' },
          { type: 'output', text: '  experience - Print work/education credentials.' },
          { type: 'output', text: '  clear      - Wipe shell logs.' },
          { type: 'output', text: '  matrix     - Activate sub-pixel digital rain.' },
        ];
        break;
      case 'about':
        reply = [
          { type: 'output', text: 'Role: Computer Science Graduate & Security Specialist' },
          { type: 'output', text: 'Specialties: Linux Systems, GCP Architecture, Threat Detection' },
          { type: 'output', text: 'Goal: Automating security responses & optimizing compilation.' },
        ];
        break;
      case 'skills':
        reply = [
          { type: 'output', text: 'Ingesting core competencies database...' },
          { type: 'output', text: '----------------------------------------' },
          { type: 'output', text: ' [SYSTEMS & SEC]  Linux OS, SIEM/SOAR rules, Network Protocol' },
          { type: 'output', text: ' [CLOUD & AUTO]  Python, Bash Scripting, GCP Armor/Compute' },
          { type: 'output', text: ' [AI & PROMPT ]  Vertex AI, LLM Prompt Engineering, Streamlit' },
          { type: 'output', text: '----------------------------------------' },
        ];
        break;
      case 'experience':
        reply = [
          { type: 'output', text: '1. Bapatla Engineering College: CS Graduate (2021-2025) [CGPA: 7.82]' },
          { type: 'output', text: '2. SkillDzire Tech: Fraud Detection System Intern (2024)' },
        ];
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'matrix':
        reply = [
          { type: 'output', text: 'Initializing digital rain stream...' },
          { type: 'output', text: '1 0 0 1 0 1 1 0 0 1 0 0 1 0' },
          { type: 'output', text: '0 1 1 0 1 0 0 1 1 0 1 1 0 1' },
          { type: 'output', text: '1 0 0 1 0 1 1 0 0 1 0 0 1 0' },
          { type: 'output', text: 'SYSTEM OVERLOAD: Digital cascade complete.' },
        ];
        break;
      default:
        if (command.startsWith('sudo')) {
          reply = [{ type: 'output', text: 'Permission Denied: User "guest" lacks root privileges.' }];
        } else {
          reply = [{ type: 'output', text: `Shell error: Command not found: "${command}". Try "help".` }];
        }
    }

    setHistory((prev) => [...prev, ...reply]);
    setInputVal('');
  };

  return (
    <div className="flex flex-col h-full justify-between" onClick={focusInput}>
      {/* Shell History Viewport */}
      <div
        ref={historyContainerRef}
        className="flex-1 overflow-y-auto space-y-2 text-xs md:text-sm text-cyan-400 p-2 scrollbar-thin scrollbar-thumb-neutral-900"
      >
        {history.map((item, idx) => (
          <div key={idx}>
            {item.type === 'input' ? (
              <p className="text-white">
                <span className="text-neutral-500">Sai@devbox:~$</span> {item.text}
              </p>
            ) : (
              <p className="whitespace-pre-wrap leading-relaxed font-light">{item.text}</p>
            )}
          </div>
        ))}
      </div>

      {/* Shell Input Row */}
      <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 border-t border-neutral-900 pt-3">
        <span className="text-neutral-500 shrink-0 select-none">Sai@devbox:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 font-mono caret-cyan-400 p-0"
          placeholder='Type a command (try "help")...'
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
