export const resumeData = {
  personalInfo: {
    name: "Abhinav Karande",
    title: "Cybersecurity Specialist & VAPT Engineer",
    subtitles: [
      "Web Application VAPT Specialist",
      "Android VAPT Auditor",
      "CCNA Network Security Engineer",
      "Ethical Hacker (EC-Council Trained)"
    ],
    email: "karandeabhinav@gmail.com",
    phone: "+91 9270889444",
    location: "Pune, Kharadi, Maharashtra",
    reportUrl: "https://drive.google.com/file/d/17uzlAmnafOpMkg_QWuc7ZUYQEQAQVbnY/view",
    githubUrl: "https://github.com/",
    linkedinUrl: "https://linkedin.com/",
    status: "Open to Application Security & VAPT Roles",
    summary: "Cybersecurity-focused BCA final-year student with hands-on training in Ethical Hacking, Web Application VAPT, and Android VAPT. Strong foundation in CCNA networking with practical experience in vulnerability assessment, penetration testing, PoC development, and security reporting. Seeking opportunities in Application Security and VAPT roles to apply real-world testing and remediation skills."
  },
  
  stats: [
    { label: "OWASP Top 10 (2025)", value: "100%", subtext: "Lab Audit Compliance" },
    { label: "Critical PoCs Built", value: "12+", subtext: "CSTI, SQLi, XSS, SSRF" },
    { label: "Certifications", value: "7+", subtext: "Cisco, EC-Council, Cybervault" },
    { label: "Network Protocol Suite", value: "CCNA", subtext: "OSPF, EIGRP, VLAN, TCP/IP" }
  ],

  skillCategories: [
    {
      id: "web-vapt",
      title: "Web & API Security VAPT",
      icon: "ShieldAlert",
      description: "Comprehensive vulnerability discovery, manual exploitation, and remediation aligned with OWASP Top 10 (2025).",
      skills: [
        { name: "OWASP Top 10 (2025)", level: 95, icon: "CheckCircle2" },
        { name: "SQL Injection (SQLi)", level: 90, icon: "Database" },
        { name: "Cross-Site Scripting (XSS)", level: 92, icon: "Code2" },
        { name: "Client-Side Template Injection (CSTI)", level: 88, icon: "Layers" },
        { name: "Server-Side Request Forgery (SSRF)", level: 85, icon: "Server" },
        { name: "XML External Entity (XXE)", level: 85, icon: "FileCode" },
        { name: "API Security & Auth Bypass", level: 88, icon: "KeyRound" },
        { name: "Burp Suite & OWASP ZAP", level: 95, icon: "Cpu" }
      ]
    },
    {
      id: "networking",
      title: "Networking & Systems Architecture",
      icon: "Network",
      description: "Strong CCNA foundation in enterprise routing, switching, firewalls, and network packet analysis.",
      skills: [
        { name: "CCNA Networking Standards", level: 92, icon: "Network" },
        { name: "TCP/IP & OSI Architecture", level: 95, icon: "Globe" },
        { name: "Subnetting & VLSM", level: 90, icon: "Binary" },
        { name: "VLAN Configuration & Security", level: 88, icon: "Shield" },
        { name: "OSPF & EIGRP Routing", level: 85, icon: "GitFork" },
        { name: "Firewalls & Access Control Lists", level: 88, icon: "Lock" },
        { name: "Wireshark Packet Analysis", level: 90, icon: "Search" },
        { name: "Network Troubleshooting", level: 92, icon: "Wrench" }
      ]
    },
    {
      id: "mobile-vapt",
      title: "Mobile Security (Android VAPT)",
      icon: "Smartphone",
      description: "Static and dynamic analysis of Android APKs, API traffic interception, and security bypasses.",
      skills: [
        { name: "Android Static & Dynamic VAPT", level: 85, icon: "Smartphone" },
        { name: "Frida Dynamic Instrumentation", level: 82, icon: "Terminal" },
        { name: "JADX Decompilation & Reverse Eng", level: 85, icon: "FolderSearch" },
        { name: "SSL Pinning Bypass", level: 88, icon: "Unlock" },
        { name: "API Traffic Interception", level: 90, icon: "Radio" }
      ]
    },
    {
      id: "tools-reporting",
      title: "Security Tools & Reporting",
      icon: "Wrench",
      description: "End-to-end security assessment tools and professional remediation documentation.",
      skills: [
        { name: "Burp Suite Professional / ZAP", level: 95, icon: "Radio" },
        { name: "Nmap Network Scanner", level: 92, icon: "Radar" },
        { name: "Metasploit Framework", level: 85, icon: "Terminal" },
        { name: "Kali Linux OS", level: 90, icon: "TerminalSquare" },
        { name: "PoC Development & Impact Analysis", level: 95, icon: "FileText" },
        { name: "Remediation & Report Writing", level: 92, icon: "ShieldCheck" }
      ]
    }
  ],

  projects: [
    {
      id: "gin-and-juice-vapt",
      title: "Web Application VAPT – Gin & Juice Security Audit",
      target: "Gin & Juice (OWASP Practice Application)",
      period: "2024 - 2025",
      type: "Web & API Security",
      severityBreakdown: { critical: 2, high: 4, medium: 3 },
      reportUrl: "https://drive.google.com/file/d/17uzlAmnafOpMkg_QWuc7ZUYQEQAQVbnY/view",
      summary: "Conducted an end-to-end Web Application Vulnerability Assessment and Penetration Test aligned with OWASP Top 10 (2025). Discovered critical vulnerabilities, crafted working Proof-of-Concepts (PoCs), performed impact analysis, and authored actionable remediation guidelines.",
      highlights: [
        "Identified Client-Side Template Injection (CSTI) leading to remote code execution risk.",
        "Discovered SQL Injection (SQLi) in search and authentication endpoints allowing database exfiltration.",
        "Uncovered Reflected & Stored Cross-Site Scripting (XSS) exploiting user session tokens.",
        "Exploited Server-Side Request Forgery (SSRF) and XML External Entity (XXE) vulnerabilities.",
        "Documented security misconfigurations and weak access controls with step-by-step remediation steps."
      ],
      tools: ["Burp Suite", "OWASP ZAP", "Burp Collaborator", "SQLmap", "Browser DevTools"],
      pocs: [
        {
          title: "CSTI Payload Execution",
          vulnerability: "Client-Side Template Injection",
          severity: "Critical",
          code: "{{constructor.constructor('alert(document.domain)')()}}",
          impact: "Unsanitized template evaluation on client-side frontend resulting in arbitrary JavaScript execution."
        },
        {
          title: "SQL Injection Data Extraction",
          vulnerability: "SQL Injection",
          severity: "Critical",
          code: "' UNION SELECT 1, username, password_hash, 4 FROM users--",
          impact: "Bypassed authentication filter and extracted hashed user credentials directly from database table."
        },
        {
          title: "SSRF Internal Metadata Fetch",
          vulnerability: "Server-Side Request Forgery",
          severity: "High",
          code: "POST /fetch?url=http://169.254.169.254/latest/meta-data/",
          impact: "Server made unvalidated internal HTTP request exposing cloud infrastructure metadata."
        }
      ]
    },
    {
      id: "android-vapt-audit",
      title: "Android VAPT & SSL Pinning Bypass Framework",
      target: "Android APK Test Environment",
      period: "2024",
      type: "Mobile Security",
      severityBreakdown: { critical: 1, high: 3, medium: 2 },
      summary: "Performed static APK decompilation and dynamic runtime manipulation using JADX and Frida scripts to bypass custom SSL pinning and audit sensitive mobile endpoints.",
      highlights: [
        "Decompiled APK binary using JADX to analyze hardcoded API tokens and secret endpoints.",
        "Executed Frida hook scripts to disable SSL certificate verification dynamically.",
        "Intercepted HTTPS network payloads via Burp Suite proxy for parameter tampering testing."
      ],
      tools: ["Frida", "JADX-GUI", "Burp Suite Proxy", "ADB Terminal", "Android Emulator"],
      pocs: [
        {
          title: "Frida SSL Pinning Hook Script",
          vulnerability: "Insecure Transport / SSL Pinning",
          severity: "High",
          code: "Java.perform(function() { var TrustManager = Java.use('javax.net.ssl.X509TrustManager'); ... });",
          impact: "Bypassed SSL pinning to decrypt encrypted REST API traffic between mobile client and backend."
        }
      ]
    },
    {
      id: "ccna-enterprise-network",
      title: "Enterprise Multi-VLAN & Routed Network Architecture",
      target: "Cisco Packet Tracer / GNS3 Topology",
      period: "2024",
      type: "Network Infrastructure",
      severityBreakdown: { critical: 0, high: 1, medium: 4 },
      summary: "Designed and implemented a secure hierarchical network topology with segmented VLANs, inter-VLAN routing, dynamic OSPF/EIGRP protocols, and firewall Access Control Lists (ACLs).",
      highlights: [
        "Configured 8+ isolated VLANs (Management, HR, IT, Guest) with strict 802.1Q trunking.",
        "Implemented OSPF Area 0 and EIGRP routing protocols with route redistribution and fast convergence.",
        "Applied Extended ACL firewalls to block unauthorized subnet traversal and ICMP probing."
      ],
      tools: ["Cisco IOS", "Packet Tracer", "Wireshark", "GNS3", "CLI"],
      pocs: [
        {
          title: "Extended ACL Firewall Rule Set",
          vulnerability: "Unrestricted Subnet Access",
          severity: "High",
          code: "access-list 101 deny ip 192.168.20.0 0.0.0.255 192.168.10.0 0.0.0.255 log\naccess-list 101 permit ip any any",
          impact: "Segmented Guest VLAN from accessing secure Admin infrastructure."
        }
      ]
    }
  ],

  experience: [
    {
      role: "Ethical Hacking & VAPT Trainee",
      organization: "Cybervault, Pune (Kothrud)",
      period: "2024",
      type: "Professional Security Training",
      location: "Pune, India",
      bullets: [
        "Hands-on intensive training in Ethical Hacking, Web Application VAPT, and Network Security.",
        "Performed vulnerability assessments and penetration testing using Burp Suite, OWASP ZAP, Nmap, and Wireshark.",
        "Developed Proof of Concepts (PoCs) and generated structured security audit reports with remediation blueprints.",
        "Practiced real-world OWASP Top 10 (2025) vulnerability exploitation in specialized CTF and lab environments."
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      specialization: "Networking & Systems",
      institution: "Shoolini University",
      location: "Solan, Himachal Pradesh",
      period: "2024 – 2027 (Final Year)",
      highlights: "Focus on Computer Networks, Data Communications, Web Systems, and Information Security."
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      specialization: "Science Stream",
      institution: "Maharashtra State Board",
      location: "Pune, Maharashtra",
      period: "Completed",
      highlights: "Strong analytical foundation in Physics, Mathematics, and Computer Science fundamentals."
    }
  ],

  certifications: [
    {
      title: "CCNA (Cisco Certified Network Associate)",
      issuer: "Cisco Networking Academy",
      certNumber: "ECC1456328907",
      status: "Verified",
      icon: "Network",
      badgeColor: "#0284C7"
    },
    {
      title: "Ethical Hacking Certification",
      issuer: "EC-Council | Cybervault, Pune",
      certNumber: "ECC1456328907",
      status: "Verified",
      icon: "ShieldCheck",
      badgeColor: "#10B981"
    },
    {
      title: "Web Application VAPT",
      issuer: "Cybervault Security Academy",
      certNumber: "CV-WVAPT-2024",
      status: "Completed",
      icon: "Code",
      badgeColor: "#6366F1"
    },
    {
      title: "Android VAPT Specialist",
      issuer: "Cybervault Security Academy",
      certNumber: "CV-AVAPT-INPROGRESS",
      status: "Ongoing",
      icon: "Smartphone",
      badgeColor: "#F59E0B"
    },
    {
      title: "IT Essentials & Networking Academy",
      issuer: "Cybervault",
      certNumber: "CV-ITE-2024",
      status: "Verified",
      icon: "Cpu",
      badgeColor: "#8B5CF6"
    },
    {
      title: "Cloud Computing Fundamentals",
      issuer: "Cybervault",
      certNumber: "CV-CC-2024",
      status: "Completed",
      icon: "Cloud",
      badgeColor: "#06B6D4"
    },
    {
      title: "Cyber Secure User Certification",
      issuer: "Cybervault",
      certNumber: "CV-CSU-2024",
      status: "Verified",
      icon: "Lock",
      badgeColor: "#EC4899"
    }
  ],

  terminalCommands: [
    {
      cmd: "whoami",
      output: "Abhinav Karande — Cybersecurity Specialist & VAPT Engineer based in Pune, India."
    },
    {
      cmd: "skills",
      output: "Web VAPT | Android VAPT | OWASP Top 10 (2025) | CCNA | TCP/IP | Burp Suite | Nmap | Wireshark"
    },
    {
      cmd: "scan --target gin-juice",
      output: "[+] Scanning Gin & Juice Web App...\n[!] Found CSTI in search endpoint [CRITICAL]\n[!] Found SQL Injection in /login [CRITICAL]\n[!] Found SSRF in /fetch-avatar [HIGH]\n[+] Audit Report generated successfully."
    },
    {
      cmd: "cert --verify",
      output: "[✓] CCNA - Cisco Networking Academy\n[✓] Ethical Hacking (EC-Council) - Cert # ECC1456328907\n[✓] Web VAPT Certified - Cybervault Pune"
    },
    {
      cmd: "contact",
      output: "Email: karandeabhinav@gmail.com | Phone: +91 9270889444 | Location: Pune, Kharadi"
    }
  ]
};
