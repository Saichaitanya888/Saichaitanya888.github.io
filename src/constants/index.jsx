// src/constants/index.jsx
import React from 'react';

// ==========================================
// PROJECTS DATA
// ==========================================
export const projects = [
  {
    title: 'ezstaf Android Application',
    type: 'Real-time Project',
    terminalOutput: [
      { text: 'Sai@devbox:~/ezstaf$ ./gradlew assembleDebug', color: 'text-neutral-500' },
      { text: '[INFO] Building backend APIs and integrating ML models...', color: 'text-white' },
      { text: '[SUCCESS] AI/ML models loaded successfully.', color: 'text-emerald-400 font-bold' },
      { text: '[INFO] APK built successfully.', color: 'text-white' },
    ],
    description: [
      'Working on a real-time Android application called ezstaf.',
      'Developed and integrated robust backend APIs to support application features.',
      'Implemented and integrated AI/ML components for advanced data processing and prediction.',
    ],
    tags: ['Android', 'Backend APIs', 'AI/ML', 'Java/Kotlin'],
    colorClasses: {
      badgeBorder: 'border-purple-500/30',
      badgeBg: 'bg-purple-500/10',
      badgeText: 'text-purple-400',
      titleHover: 'group-hover:text-purple-300',
      bullet: 'bg-purple-400',
      shadow: 'rgba(168, 85, 247, 0.25)', // Softer glow
      glowColor: '#a855f7',
    },
    gradient: 'from-purple-500/50 to-transparent',
  },
  {
    title: 'Android Open Source Project (AOSP)',
    type: 'Open Source',
    terminalOutput: [
      { text: 'Sai@devbox:~/Infy$ source build/envsetup.sh && lunch aosp_rmgtn2', color: 'text-neutral-500' },
      { text: '[INFO] Starting build for Android 16...', color: 'text-white' },
      { text: '[INFO] Parsing manifests and optimizing kernel.', color: 'text-white' },
      { text: '[BUILD SUCCESS] target: Infinity-X_Bitra-ota.zip', color: 'text-emerald-400 font-bold' },
    ],
    description: [
      'Built AOSP from source and ported custom ROMs for Realme GT Neo 2, optimizing kernel stability.',
      'Utilized ADB Logcat and MIO for deep system-level debugging and security troubleshooting.',
      'Leveraged Google Cloud (GCP) for automated build environments and high-speed compilation.',
    ],
    tags: ['AOSP', 'GCP', 'Bash', 'Git', 'Vertex AI'],
    colorClasses: {
      badgeBorder: 'border-cyan-500/30',
      badgeBg: 'bg-cyan-500/10',
      badgeText: 'text-cyan-400',
      titleHover: 'group-hover:text-cyan-300',
      bullet: 'bg-cyan-400',
      shadow: 'rgba(6, 182, 212, 0.25)', // Softer glow
      glowColor: '#06b6d4',
    },
    gradient: 'from-cyan-500/50 to-transparent',
  },
  {
    title: 'Log Detection & Alerting',
    type: 'Security Tool',
    terminalOutput: [
      { text: 'root@logengine-vm:~$ tail -f /var/log/syslog', color: 'text-neutral-500' },
      { text: '[INFO] Ingested 1500 logs. No threats detected.', color: 'text-white' },
      { text: '[WARN] Unrecognized user \'oracle\' from 192.168.1.100.', color: 'text-amber-400' },
      { text: '[MITRE ATT&CK] T1078 Mapping identified: Valid Accounts.', color: 'text-emerald-400 font-bold' },
    ],
    description: [
      'Developed a Python-based log engine that ingests and parses Linux system logs for security threats.',
      'Implemented detection rules for brute-force attacks, privilege escalation, and port scanning.',
      'Integrated MITRE ATT&CK mapping to categorize incidents and built an automated alert system.',
    ],
    tags: ['Python', 'Linux', 'CyberSecurity', 'Network Security'],
    colorClasses: {
      badgeBorder: 'border-emerald-500/30',
      badgeBg: 'bg-emerald-500/10',
      badgeText: 'text-emerald-400',
      titleHover: 'group-hover:text-emerald-300',
      bullet: 'bg-emerald-400',
      shadow: 'rgba(16, 185, 129, 0.25)', // Softer glow
      glowColor: '#10b981',
    },
    gradient: 'from-emerald-500/50 to-transparent',
  }
];

// ==========================================
// SKILLS DATA
// ==========================================
export const skillsData = [
  {
    title: 'Systems & Security',
    glow: 'rgba(16, 185, 129, 0.4)',
    gradientBorder: 'from-emerald-500/50 to-transparent',
    iconColorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
    description:
      'Deep expertise in Linux systems, cybersecurity protocols, and security operations frameworks.',
    tags: [
      { text: 'Linux / Unix', colorClass: 'text-emerald-400 border-emerald-500/20 hover:border-emerald-400 hover:text-white' },
      { text: 'CyberSecurity', colorClass: 'text-emerald-400 border-emerald-500/20 hover:border-emerald-400 hover:text-white' },
      { text: 'Network Security', colorClass: 'text-emerald-400 border-emerald-500/20 hover:border-emerald-400 hover:text-white' },
      { text: 'SIEM / SOAR', colorClass: 'text-emerald-400 border-emerald-500/20 hover:border-emerald-400 hover:text-white' },
    ],
  },
  {
    title: 'Cloud & Automation',
    glow: 'rgba(6, 182, 212, 0.4)',
    gradientBorder: 'from-cyan-500/50 to-transparent',
    iconColorClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
        />
      </svg>
    ),
    description:
      'Building scalable automated compilation environments, cloud-based compilers, and shell automation scripts.',
    tags: [
      { text: 'Python', colorClass: 'text-cyan-400 border-cyan-500/20 hover:border-cyan-400 hover:text-white' },
      { text: 'Bash Scripting', colorClass: 'text-cyan-400 border-cyan-500/20 hover:border-cyan-400 hover:text-white' },
      { text: 'Google Cloud (GCP)', colorClass: 'text-cyan-400 border-cyan-500/20 hover:border-cyan-400 hover:text-white' },
      { text: 'Git / GitHub', colorClass: 'text-cyan-400 border-cyan-500/20 hover:border-cyan-400 hover:text-white' },
    ],
  },
  {
    title: 'AI & Analytics',
    glow: 'rgba(168, 85, 247, 0.4)',
    gradientBorder: 'from-purple-500/50 to-transparent',
    iconColorClass: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),
    description:
      'Designing generative AI applications with LLMs and prompt patterns in Google Cloud Vertex AI.',
    tags: [
      { text: 'Vertex AI', colorClass: 'text-purple-400 border-purple-500/20 hover:border-purple-400 hover:text-white' },
      { text: 'Prompt Design', colorClass: 'text-purple-400 border-purple-500/20 hover:border-purple-400 hover:text-white' },
      { text: 'Gemini / LLMs', colorClass: 'text-purple-400 border-purple-500/20 hover:border-purple-400 hover:text-white' },
      { text: 'Streamlit', colorClass: 'text-purple-400 border-purple-500/20 hover:border-purple-400 hover:text-white' },
    ],
  },
  {
    title: 'Core Strengths',
    glow: 'rgba(236, 72, 153, 0.4)',
    gradientBorder: 'from-pink-500/50 to-transparent',
    iconColorClass: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
    description:
      'Applying structured logic, critical debugging methods, and automation algorithms to resolve operational challenges.',
    tags: [
      { text: 'Problem Solving', colorClass: 'text-pink-400 border-pink-500/20 hover:border-pink-400 hover:text-white' },
      { text: 'Analytical Thinking', colorClass: 'text-pink-400 border-pink-500/20 hover:border-pink-400 hover:text-white' },
      { text: 'Workflow Automation', colorClass: 'text-pink-400 border-pink-500/20 hover:border-pink-400 hover:text-white' },
      { text: 'System Debugging', colorClass: 'text-pink-400 border-pink-500/20 hover:border-pink-400 hover:text-white' },
    ],
  },
  {
    title: 'Python Programming',
    glow: 'rgba(56, 189, 248, 0.4)',
    gradientBorder: 'from-sky-500/50 to-transparent',
    iconColorClass: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    ),
    description:
      'Solid grasp of Python core syntax, Object-Oriented Programming (OOPs), custom functions, and modular scripting for automation.',
    tags: [
      { text: 'OOPs Concepts', colorClass: 'text-sky-400 border-sky-500/20 hover:border-sky-400 hover:text-white' },
      { text: 'Core Programming', colorClass: 'text-sky-400 border-sky-500/20 hover:border-sky-400 hover:text-white' },
      { text: 'Scripting & Logic', colorClass: 'text-sky-400 border-sky-500/20 hover:border-sky-400 hover:text-white' },
      { text: 'Variables & Loops', colorClass: 'text-sky-400 border-sky-500/20 hover:border-sky-400 hover:text-white' },
    ],
  },
  {
    title: 'Android App Development',
    glow: 'rgba(16, 185, 129, 0.4)',
    gradientBorder: 'from-emerald-500/50 to-transparent',
    iconColorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 15h9"
        />
      </svg>
    ),
    description:
      'Experience designing and building mobile applications in Android Studio using Java, including UI layouts, activity states, and native features.',
    tags: [
      { text: 'Android Studio', colorClass: 'text-emerald-400 border-emerald-500/20 hover:border-emerald-400 hover:text-white' },
      { text: 'Java', colorClass: 'text-amber-500 border-amber-500/20 hover:border-amber-500 hover:text-white' },
      { text: 'Mobile UI Design', colorClass: 'text-emerald-400 border-emerald-500/20 hover:border-emerald-400 hover:text-white' },
      { text: 'App Lifecycle', colorClass: 'text-emerald-400 border-emerald-500/20 hover:border-emerald-400 hover:text-white' },
    ],
  },
];

// ==========================================
// CERTIFICATIONS DATA
// ==========================================
export const certificationsData = [
  {
    title: 'Prompt Design in Vertex AI',
    issuer: 'Google Cloud Platform',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-purple-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.761a2.25 2.25 0 00-.019-2.838L12.078 1.62a2.25 2.25 0 00-2.838-.019L1.62 9.813a2.25 2.25 0 00-.019 2.838L6.92 18.08a2.25 2.25 0 002.893.076l.019-.016M15 11.25l.041-.02a.75.75 0 11.082 1.25l-.041.02a.75.75 0 01-.082-1.25z" />
      </svg>
    )
  },
  {
    title: 'GenAI Apps with Gemini & Streamlit',
    issuer: 'Google Cloud Platform',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-cyan-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38 6.002 6.002 0 01-5.4-3.41 5.978 5.978 0 010-7.38c.64-.84 1.5-1.5 2.47-1.93a5.96 5.96 0 018.77 5.34z" />
      </svg>
    )
  },
  {
    title: 'Chronicle SecOps Platform Fundamentals',
    issuer: 'Google Cloud Security',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-emerald-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    )
  },
  {
    title: 'Google Security Operations (SIEM) Intro',
    issuer: 'Google Cloud Security',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-indigo-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  }
];

// ==========================================
// EXPERIENCE DATA
// ==========================================
export const experienceData = [
  {
    type: 'Internship',
    date: 'Present',
    title: 'AI/ML Intern',
    company: 'TriTech Innovations Private Limited',
    location: 'Kondapur, Hyderabad',
    locationLabel: 'LOCATION',
    bullets: [
      'Developing and deploying machine learning models to solve real-world problems.',
      'Collaborating with the backend team to integrate AI/ML functionalities via APIs.',
    ],
    color: 'purple',
    hoverGlow: 'rgba(168, 85, 247, 0.4)',
    gradient: 'from-purple-500/50',
    borderBeam: 'rgba(168, 85, 247, 1)',
    badgeBorder: 'border-purple-500/30',
    badgeBg: 'bg-purple-500/10',
    badgeText: 'text-purple-400',
    titleHover: 'group-hover:text-purple-300',
    bulletColor: 'bg-purple-400',
    locationColor: 'text-purple-400',
    delay: 0,
  },
  {
    type: 'Education',
    date: '2021 – 2025',
    title: 'Bachelor of Computer Science',
    company: 'Bapatla Engineering College',
    location: 'CGPA: 7.82', // Re-purposing location for CGPA
    locationLabel: 'ACADEMIC PERFORMANCE',
    bullets: [
      'Comprehensive study of computer architecture, algorithms, and system programming.',
      'Gained deep theoretical foundation and hands-on laboratory experience in operating systems and networking security.',
    ],
    color: 'emerald',
    hoverGlow: 'rgba(16, 185, 129, 0.4)',
    gradient: 'from-emerald-500/50',
    borderBeam: 'rgba(16, 185, 129, 1)',
    badgeBorder: 'border-emerald-500/30',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-400',
    titleHover: 'group-hover:text-emerald-300',
    bulletColor: 'bg-emerald-400',
    locationColor: 'text-emerald-400',
    delay: 50,
  },
  {
    type: 'Internship',
    date: 'May 2024 – July 2024',
    title: 'Fraud Detection System Intern',
    company: 'SkillDzire Technologies Pvt. Ltd',
    location: 'Hyderabad, India',
    locationLabel: 'LOCATION',
    bullets: [
      'Analyzed transaction data and identified anomalies, improving security detection parameters.',
      'Worked with large datasets to detect irregular patterns and troubleshoot workflow inconsistencies.',
      'Gained valuable experience handling real-world data security threats and debugging logs.',
    ],
    color: 'cyan',
    hoverGlow: 'rgba(6, 182, 212, 0.4)',
    gradient: 'from-cyan-500/50',
    borderBeam: 'rgba(6, 182, 212, 1)',
    badgeBorder: 'border-cyan-500/30',
    badgeBg: 'bg-cyan-500/10',
    badgeText: 'text-cyan-400',
    titleHover: 'group-hover:text-cyan-300',
    bulletColor: 'bg-cyan-400',
    locationColor: 'text-cyan-400',
    delay: 100,
  }
];
