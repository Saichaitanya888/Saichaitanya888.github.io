import { useState, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Projects() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFrontHovered, setIsFrontHovered] = useState(false);
  const [isBackHovered, setIsBackHovered] = useState(false);

  const lastTapRef = useRef(0);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      toggleFlip();
    }
    lastTapRef.current = now;
  };

  const frontFilter = isFrontHovered ? 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.4))' : 'none';
  const backFilter = isBackHovered ? 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.4))' : 'none';

  return (
    <section id="projects" className="min-h-screen py-32 flex flex-col justify-center">
      {/* Header with Title and Toggle Button */}
      <ScrollReveal animation="fade-up">
        <div className="mb-12 flex items-end justify-between w-full">
          <div>
            <h2 className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-2">
              Selected Work
            </h2>
            <p className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
              Featured Projects
            </p>
          </div>
          <button
            onClick={toggleFlip}
            className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 text-white transition-all duration-300 hover:scale-105 active:scale-95 hover:border-emerald-500/50 cursor-pointer"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.55)' }}
            aria-label="Flip Project Card"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="relative z-10 w-5 h-5 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all duration-300"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l6 6m0 0l-6 6m6-6H3.75" />
            </svg>
          </button>
        </div>
      </ScrollReveal>

      {/* 3D Carousel Viewport */}
      <ScrollReveal animation="zoom-in" delay={150} className="w-full">
        <div className="project-carousel-viewport w-full">
        <div className={`project-carousel-card ${isFlipped ? 'project-flipped' : ''}`}>
          
          {/* Front Face: AOSP */}
          <div
            className="project-face-front group relative rounded-2xl p-[1px] transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            style={{
              filter: frontFilter,
              pointerEvents: isFlipped ? 'none' : 'auto', // disable hover actions when face is hidden
            }}
            onMouseEnter={() => setIsFrontHovered(true)}
            onMouseLeave={() => setIsFrontHovered(false)}
            onTouchStart={handleDoubleTap}
          >
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 opacity-30 group-hover:opacity-100 transition-opacity duration-500"></span>
            <div className="relative w-full h-full bg-neutral-900 rounded-2xl p-6 md:p-8">
              {/* Terminal Box */}
              <div className="terminal-output relative w-full h-56 rounded-xl bg-black border border-neutral-800/50 mb-6 p-4 overflow-hidden text-sm md:text-base">
                <div className="flex items-center space-x-2 mb-3 border-b border-neutral-800/50 pb-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
                </div>
                <div className="space-y-1">
                  <p className="text-neutral-500">
                    Sai@devbox:~/Infy$ source build/envsetup.sh && lunch aosp_rmgtn2-userdebug
                  </p>
                  <p>[INFO] Starting build for Android 16... </p>
                  <p>[INFO] Parsing manifests and optimizing kernel.</p>
                  <p className="text-emerald-400 font-bold">
                    [BUILD SUCCESS] target Filesystem: Infinity-X_Bitra-ota.zip
                  </p>
                </div>
              </div>

              {/* Text Info */}
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-4 font-sans">
                Android Open Source Project (AOSP)
              </h3>
              <ul className="space-y-3 text-neutral-400 text-sm md:text-base font-light leading-relaxed mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-400 mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                  Built AOSP from source and ported custom ROMs for Realme GT Neo 2, optimizing for kernel stability and hardware efficiency.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-400 mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                  Utilized ADB Logcat and MIO for deep system-level debugging and security troubleshooting.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-400 mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                  Leveraged Google Cloud (GCP) for automated build environments and high-speed compilation workflows.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-400 mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                  Automated build and debugging workflows using cloud environments and Git.
                </li>
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="tech-tag tag-aosp">AOSP</span>
                <span className="tech-tag tag-gcp">GCP</span>
                <span className="tech-tag tag-bash">Bash Scripting</span>
                <span className="tech-tag tag-git">Git/GitHub</span>
                <span className="tech-tag tag-vertex">Vertex AI</span>
              </div>
            </div>
          </div>

          {/* Back Face: Log Detection System */}
          <div
            className="project-face-back group relative rounded-2xl p-[1px] transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            style={{
              filter: backFilter,
              pointerEvents: isFlipped ? 'auto' : 'none', // disable hover actions when face is hidden
            }}
            onMouseEnter={() => setIsBackHovered(true)}
            onMouseLeave={() => setIsBackHovered(false)}
            onTouchStart={handleDoubleTap}
          >
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-600 opacity-30 group-hover:opacity-100 transition-opacity duration-500"></span>
            <div className="relative w-full h-full bg-neutral-900 rounded-2xl p-6 md:p-8">
              {/* Terminal Box */}
              <div className="terminal-output relative w-full h-56 rounded-xl bg-black border border-neutral-800/50 mb-6 p-4 overflow-hidden text-sm md:text-base">
                <div className="flex items-center space-x-2 mb-3 border-b border-neutral-800/50 pb-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
                </div>
                <div className="space-y-1">
                  <p className="text-neutral-500">root@logengine-vm:~$ tail -f /var/log/syslog</p>
                  <p>[INFO] Ingested 1500 logs. No threats detected.</p>
                  <p className="text-amber-400">[WARN] Unrecognized user 'oracle' from 192.168.1.100.</p>
                  <p className="text-emerald-400 font-bold">
                    [MITRE ATT&CK] T1078 Mapping identified: Valid Accounts.
                  </p>
                  <p>[INFO] Continuing log stream...</p>
                </div>
              </div>

              {/* Text Info */}
              <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-4 font-sans">
                Log Detection & Alerting System
              </h3>
              <ul className="space-y-3 text-neutral-400 text-sm md:text-base font-light leading-relaxed mb-6">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  Developed a Python-based log engine that ingests and parses Linux system logs to identify security threats.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  Implemented detection rules for brute-force attacks, privilege escalation, and unauthorized port scanning.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  Integrated MITRE ATT&CK mapping to categorize incidents and built an automated alert generation system.
                </li>
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="tech-tag tag-python">Python</span>
                <span className="tech-tag tag-linux">Linux</span>
                <span className="tech-tag tag-security">CyberSecurity</span>
                <span className="tech-tag tag-git">Git</span>
                <span className="tech-tag tag-netsec">Network Security</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </ScrollReveal>
  </section>
  );
}
