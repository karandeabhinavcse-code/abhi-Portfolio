export const resumeData = {
  personalInfo: {
    name: "Abhinav Karande",
    title: "Cybersecurity & VAPT Enthusiast",
    subtitles: [
      "Cybersecurity & VAPT Enthusiast",
      "Web Application VAPT Learner",
      "Android Security & VAPT Practitioner",
      "CCNA Networking Concepts & Security"
    ],
    email: "karandeabhinav@gmail.com",
    location: "Pune, Maharashtra, India",
    reportUrl: "/Abhinav_Karande_Resume.pdf",
    githubUrl: "https://github.com/karandeabhinavcse-code",
    linkedinUrl: "https://www.linkedin.com/in/abhinav-karande-9227b33a2",
    status: "Open for Cybersecurity & VAPT Internships",
    summary: "BCA student focused on Web, Network, and Android Application Security, with hands-on experience in vulnerability assessment, penetration testing labs, networking, and security tools."
  },

  about: {
    intro: "I am a Bachelor of Computer Applications (BCA) student with a core focus on Cybersecurity, Vulnerability Assessment, and Penetration Testing (VAPT).",
    bullets: [
      "BCA final-year student with a strong foundation in computer science fundamentals.",
      "Primary interest and passion in Cybersecurity & Practical Security Testing.",
      "Focused on Web Application VAPT following OWASP Top 10 standards.",
      "Solid knowledge of networking protocols and CCNA security concepts.",
      "Actively working on and learning Android Application Security & VAPT.",
      "Developing Python and Bash scripting skills for security automation.",
      "Enthusiastic about hands-on security labs, CTF challenges, and practical vulnerability auditing."
    ]
  },

  stats: [
    { label: "Focus Areas", value: "Web & Mobile", subtext: "OWASP Top 10 & Android VAPT" },
    { label: "Lab Audits", value: "3+", subtext: "Web, Mobile & Network Labs" },
    { label: "Certifications", value: "7+", subtext: "Cisco, EC-Council, Cybervault" },
    { label: "Networking", value: "CCNA", subtext: "TCP/IP, Routing & Subnetting" }
  ],

  skillCategories: [
    {
      id: "web-security",
      title: "Web Security",
      icon: "ShieldAlert",
      description: "Identification and assessment of web application vulnerabilities in controlled lab environments.",
      skills: [
        "Burp Suite",
        "OWASP ZAP",
        "OWASP Top 10",
        "Web VAPT",
        "SQL Injection (SQLi)",
        "Cross-Site Scripting (XSS)",
        "CSTI & Template Exploitation",
        "SSRF & XXE Vulnerabilities"
      ]
    },
    {
      id: "network-security",
      title: "Network Security",
      icon: "Network",
      description: "Network reconnaissance, protocol analysis, traffic sniffing, and fundamental CCNA routing & switching.",
      skills: [
        "Nmap",
        "Wireshark",
        "TCP/IP",
        "Networking",
        "CCNA concepts",
        "Network enumeration",
        "Subnetting & VLSM",
        "Access Control Lists (ACLs)"
      ]
    },
    {
      id: "android-security",
      title: "Android Security",
      icon: "Smartphone",
      description: "Static analysis, dynamic instrumentation, and traffic proxying for mobile application audits.",
      skills: [
        "Android VAPT",
        "ADB (Android Debug Bridge)",
        "APK analysis",
        "Burp Suite Proxy",
        "JADX Decompilation",
        "Frida Hooking Basics",
        "SSL Pinning Bypass Basics"
      ]
    },
    {
      id: "penetration-testing",
      title: "Security / Penetration Testing",
      icon: "Wrench",
      description: "Practical penetration testing tools and structured vulnerability assessment methodology.",
      skills: [
        "Kali Linux",
        "Metasploit",
        "Vulnerability Assessment",
        "Nessus / OpenVAS",
        "PoC Development",
        "Security Audit Documentation"
      ]
    },
    {
      id: "programming-scripting",
      title: "Programming / Scripting",
      icon: "Code2",
      description: "Writing scripts and basic utilities for cybersecurity automation and data manipulation.",
      skills: [
        "Python",
        "Bash Scripting",
        "SQL",
        "HTML / CSS Basics",
        "JavaScript Fundamentals"
      ]
    },
    {
      id: "platforms-environment",
      title: "Platforms / Environment",
      icon: "Server",
      description: "Operating system environments and virtualized laboratory infrastructure.",
      skills: [
        "Linux (Kali, Ubuntu)",
        "Windows",
        "VMware Workstation / VirtualBox",
        "Docker Basics"
      ]
    }
  ],

  projects: [
    {
      id: "vapt-ai-toolkit",
      featured: true,
      title: "VAPT-AI – AI-Assisted Vulnerability Assessment Toolkit",
      target: "Kali Linux",
      period: null,
      type: "Python Security Tool / VAPT Tool",
      environmentType: "Personal Security Tool",
      objective: "A Python-based cybersecurity toolkit built for authorized vulnerability assessment and security testing, with automated assessment workflows, risk analysis, and security reporting.",
      summary: "A Python-based cybersecurity toolkit built for authorized vulnerability assessment and security testing, with automated assessment workflows, risk analysis, and security reporting.",
      methodology: "Target Validation → Defensive Reconnaissance → HTTP Security Audit → Deterministic Risk Scoring → Modular AI Analysis → Security Reporting",
      whatILearned: "Engineered Python CLI with rich formatting, implemented non-destructive HTTP/TLS auditing, developed a 0–100 deterministic risk scoring algorithm, and built a modular AI analysis interface.",
      keyWork: [
        "Interactive Rich CLI terminal interface with target validation logic",
        "Non-destructive HTTP header audits & TLS security checks",
        "Deterministic 0–100 risk scoring & HTML/JSON report generation",
        "Modular AI analysis layer for explaining findings & remediation guidance"
      ],
      highlights: [
        "Interactive Rich CLI terminal menu and subcommand interface with target validation logic.",
        "Non-destructive HTTP header audits, TLS configuration checks, and technology fingerprinting.",
        "Deterministic 0–100 risk scoring with automated HTML/JSON report generation.",
        "Modular AI analysis layer for explaining findings and generating remediation guidance."
      ],
      tools: ["Python", "Kali Linux", "VAPT", "Security Automation"],
      githubUrl: "https://github.com/karandeabhinavcse-code/VAPT-AI",
      reportUrl: null,
      findings: [
        {
          name: "HTTP Security Header & TLS Audit Vulnerability Detection",
          severity: "MEDIUM",
          category: "Web Security Headers",
          description: "Identifies missing HTTP defensive headers (HSTS, CSP, X-Frame-Options) and evaluates TLS transport security configuration.",
          evidence: "vapti web https://target-app.local",
          impact: "Detects unencrypted transport hazards and missing client-side security policies.",
          remediation: "Enforce HSTS, implement strict Content-Security-Policy headers, and disable legacy TLS protocols."
        },
        {
          name: "Deterministic Risk Scoring Engine",
          severity: "INFO",
          category: "Risk Assessment",
          description: "Calculates a 0–100 risk index by assessing technical severity, impact factors, and evidence quality.",
          evidence: "vapti scan https://target-app.local --output html",
          impact: "Standardizes security risk evaluation across automated audit workflows.",
          remediation: "Maintain consistent severity mappings and export standardized security reports."
        }
      ],
      pocs: [
        {
          title: "VAPT-AI CLI Scan Command",
          vulnerability: "Defensive Security Audit & Scan Workflow",
          severity: "MEDIUM",
          code: "vapti scan https://target-app.local --report html",
          impact: "Executes automated assessment workflows, scores risk, and exports HTML/JSON reports."
        }
      ]
    },
    {
      id: "web-vapt-audit",
      title: "Web Application VAPT – Controlled Lab Audit",
      target: "OWASP Juice Shop",
      period: null,
      type: "Web Application VAPT",
      environmentType: "Controlled Lab Assessment",
      objective: "Performed security testing of an intentionally vulnerable web application in a controlled environment to evaluate common vulnerabilities based on the OWASP Top 10.",
      summary: "Performed security testing of an intentionally vulnerable web application in a controlled environment, identified security weaknesses, documented technical evidence, and prepared remediation recommendations.",
      methodology: "Reconnaissance → Enumeration → Security Testing → Validation → Evidence Collection → Reporting",
      whatILearned: "Deepened practical understanding of OWASP Top 10 vulnerabilities, input validation logic, HTTP request inspection via Burp Suite, and structured vulnerability documentation.",
      keyWork: [
        "Application reconnaissance",
        "OWASP Top 10 security testing",
        "Findings & remediation documentation"
      ],
      highlights: [
        "Application reconnaissance and input vector mapping.",
        "OWASP Top 10 vulnerability assessment in controlled environment.",
        "Findings & remediation documentation with technical evidence."
      ],
      tools: ["Burp Suite", "OWASP ZAP", "Kali Linux", "OWASP Top 10"],
      githubUrl: null,
      reportUrl: "https://drive.google.com/file/d/17uzlAmnafOpMkg_QWuc7ZUYQEQAQVbnY/view",
      findings: [
        {
          name: "Client-Side Template Injection (CSTI)",
          severity: "CRITICAL",
          category: "Injection",
          description: "Unsanitized user input evaluated dynamically within client-side frontend rendering engine.",
          evidence: "{{constructor.constructor('alert(document.domain)')()}}",
          impact: "Allows execution of arbitrary JavaScript within the victim browser context.",
          remediation: "Implement strict context-aware input sanitization and enforce Content Security Policy (CSP)."
        },
        {
          name: "SQL Injection (SQLi) Auth Bypass",
          severity: "CRITICAL",
          category: "Database Security",
          description: "Parameter concatenation in backend SQL query string allowing logic manipulation.",
          evidence: "' UNION SELECT 1, username, password_hash, 4 FROM users--",
          impact: "Extraction of sensitive user credentials and authentication bypass.",
          remediation: "Use parameterized queries (Prepared Statements) for all database operations."
        },
        {
          name: "Reflected Cross-Site Scripting (XSS)",
          severity: "HIGH",
          category: "Cross-Site Scripting",
          description: "Search parameter reflected back into server HTTP response without HTML entity encoding.",
          evidence: "<script>alert('XSS-Test')</script>",
          impact: "Session hijacking risk via cookie theft if HttpOnly flag is missing.",
          remediation: "Apply context-appropriate HTML entity encoding on all reflected user inputs."
        }
      ],
      pocs: [
        {
          title: "CSTI Payload Execution",
          vulnerability: "Client-Side Template Injection",
          severity: "CRITICAL",
          code: "{{constructor.constructor('alert(document.domain)')()}}",
          impact: "Unsanitized template evaluation on client-side frontend resulting in script execution."
        },
        {
          title: "SQL Injection Authentication Bypass",
          vulnerability: "SQL Injection",
          severity: "CRITICAL",
          code: "' UNION SELECT 1, username, password_hash, 4 FROM users--",
          impact: "Bypassed filter logic to extract hashed credentials from database table in lab testing."
        }
      ]
    },
    {
      id: "network-security-assessment",
      title: "Network Vulnerability Assessment & Reconnaissance Lab",
      target: "Controlled Subnet / Virtual Machine Topology",
      period: null,
      type: "Network Vulnerability Assessment",
      environmentType: "Controlled Lab Assessment",
      objective: "Performed network reconnaissance, service enumeration, vulnerability assessment, and network traffic analysis across virtual lab hosts in a controlled environment.",
      summary: "Performed host discovery, port and service enumeration, vulnerability assessment, and network traffic analysis across virtual lab hosts in a controlled environment.",
      methodology: "Reconnaissance → Host & Service Discovery → Traffic Analysis → Vulnerability Identification → Hardening Recommendations",
      whatILearned: "Mastered Nmap engine flags for service scanning, Wireshark packet capture analysis, subnet isolation concepts, and network perimeter security controls.",
      keyWork: [
        "Host & service discovery",
        "Vulnerability assessment",
        "Network traffic analysis"
      ],
      highlights: [
        "Host & service discovery across virtual lab subnets.",
        "Vulnerability assessment of running services.",
        "Network traffic analysis using Wireshark captures."
      ],
      tools: ["Nmap", "Wireshark", "Kali Linux", "Networking"],
      githubUrl: null,
      reportUrl: null,
      findings: [
        {
          name: "Exposed Legacy Unencrypted Services",
          severity: "MEDIUM",
          category: "Network Infrastructure",
          description: "Lab host running legacy unencrypted Telnet/FTP services transmitting credentials in cleartext.",
          evidence: "nmap -sV -sC -p- -T4 192.168.1.0/24 -oN network_audit.txt",
          impact: "Eavesdropping and credential interception by malicious actors on the local network segment.",
          remediation: "Disable unencrypted protocols; migrate to SSH (Port 22) and SFTP/TLS."
        }
      ],
      pocs: [
        {
          title: "Nmap Service Enumeration Command",
          vulnerability: "Exposed Unencrypted Services",
          severity: "MEDIUM",
          code: "nmap -sV -sC -p- -T4 192.168.1.0/24 -oN network_audit.txt",
          impact: "Identified outdated service versions and unencrypted communication ports across lab hosts."
        }
      ]
    }
  ],

  experience: [
    {
      role: "Ethical Hacking & VAPT Trainee",
      organization: "Cybervault, Pune (Kothrud)",
      period: "2024",
      type: "Practical Security Training",
      location: "Pune, India",
      bullets: [
        "Hands-on practical training in Ethical Hacking, Web Application VAPT, and Network Security.",
        "Performed vulnerability assessment and penetration testing exercises using Burp Suite, OWASP ZAP, Nmap, and Wireshark.",
        "Practiced OWASP Top 10 vulnerability identification in controlled laboratory environments.",
        "Prepared structured vulnerability assessment reports detailing findings and remediation steps."
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Shoolini University",
      period: "2024 – 2027 (Final Year)",
      status: "Currently Pursuing",
      coursework: "Computer Networks, Data Communications, Web Security Fundamentals, Information Security, Python Programming, Database Management."
    }
  ],

  certifications: [
    {
      title: "CCNA (Cisco Certified Network Associate) Course",
      issuer: "Cisco Networking Academy",
      completionDate: "2024",
      certNumber: "Verified Coursework",
      credentialUrl: null,
      icon: "Network"
    },
    {
      title: "Ethical Hacking Certification",
      issuer: "EC-Council | Cybervault, Pune",
      completionDate: "2024",
      certNumber: "ECC1456328907",
      credentialUrl: "https://drive.google.com/file/d/1YGL5TF68hMsIBeRAdu6evVHTbnNsNeYa/view?usp=sharing",
      icon: "ShieldCheck"
    },
    {
      title: "Web Application VAPT",
      issuer: "Cybervault Security Academy",
      completionDate: "2024",
      certNumber: "CV-WVAPT-2024",
      credentialUrl: null,
      icon: "Code"
    },
    {
      title: "Android VAPT Specialist",
      issuer: "Cybervault Security Academy",
      completionDate: "2024 (In Progress)",
      certNumber: "CV-AVAPT-2024",
      credentialUrl: null,
      icon: "Smartphone"
    },
    {
      title: "IT Essentials & Networking Academy",
      issuer: "Cybervault",
      completionDate: "2024",
      certNumber: "CV-ITE-2024",
      credentialUrl: null,
      icon: "Cpu"
    },
    {
      title: "Cloud Computing Fundamentals",
      issuer: "Cybervault",
      completionDate: "2024",
      certNumber: "CV-CC-2024",
      credentialUrl: null,
      icon: "Cloud"
    },
    {
      title: "Cyber Secure User Certification",
      issuer: "Cybervault",
      completionDate: "2024",
      certNumber: "CV-CSU-2024",
      credentialUrl: null,
      icon: "Lock"
    }
  ],

  currentlyLearning: [
    { name: "Android VAPT", desc: "Deeper static/dynamic APK analysis & Frida hooking" },
    { name: "Advanced Web VAPT", desc: "Complex business logic & OAuth API security audits" },
    { name: "Python for Security Automation", desc: "Custom security tools & log parser utilities" },
    { name: "Cybersecurity Labs", desc: "Hands-on vulnerability labs & CTF challenge practice" }
  ]
};
