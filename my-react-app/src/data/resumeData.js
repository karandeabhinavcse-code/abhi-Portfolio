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
    linkedinUrl: "https://www.linkedin.com/in/abhinav-karande-9227b33a2?utm_source=share_via&utm_content=profile&utm_medium=member_android",
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
      id: "web-vapt-audit",
      title: "Web Application VAPT – Controlled Lab Audit",
      target: "Gin & Juice (OWASP Practice Application)",
      period: "2024 - 2025",
      type: "Web Application VAPT",
      objective: "Performed security testing of a controlled web application environment to identify common vulnerabilities based on the OWASP Top 10.",
      summary: "Conducted an end-to-end Web Application Vulnerability Assessment in a controlled environment. Discovered critical security misconfigurations, crafted working Proof-of-Concepts (PoCs), and authored actionable remediation recommendations.",
      highlights: [
        "Identified Client-Side Template Injection (CSTI) leading to client-side code execution risks.",
        "Discovered SQL Injection (SQLi) in search endpoints allowing unauthorized database querying.",
        "Uncovered Reflected & Stored Cross-Site Scripting (XSS) exploiting user sessions.",
        "Tested Server-Side Request Forgery (SSRF) and XML External Entity (XXE) vectors.",
        "Documented step-by-step remediation strategies for each identified vulnerability."
      ],
      tools: ["Burp Suite", "OWASP ZAP", "Burp Collaborator", "SQLmap", "Browser DevTools"],
      githubUrl: "https://github.com/karandeabhinavcse-code",
      reportUrl: "/Abhinav_Karande_Resume.pdf",
      pocs: [
        {
          title: "CSTI Payload Execution",
          vulnerability: "Client-Side Template Injection",
          severity: "Critical",
          code: "{{constructor.constructor('alert(document.domain)')()}}",
          impact: "Unsanitized template evaluation on client-side frontend resulting in script execution."
        },
        {
          title: "SQL Injection Authentication Bypass",
          vulnerability: "SQL Injection",
          severity: "Critical",
          code: "' UNION SELECT 1, username, password_hash, 4 FROM users--",
          impact: "Bypassed filter logic to extract hashed credentials from database table in lab testing."
        }
      ]
    },
    {
      id: "network-security-assessment",
      title: "Network Vulnerability Assessment & Reconnaissance Lab",
      target: "Controlled Subnet / Virtual Machine Topology",
      period: "2024",
      type: "Network Vulnerability Assessment",
      objective: "Performed network reconnaissance, service enumeration, vulnerability assessment, and traffic analysis in a controlled lab environment.",
      summary: "Executed active scanning, port enumeration, and packet interception across virtual lab hosts to detect unpatched services and misconfigured network access controls.",
      highlights: [
        "Executed Nmap host discovery, OS fingerprinting, and script scanning across lab subnets.",
        "Analyzed TCP/IP traffic flows, HTTP requests, and DNS lookups using Wireshark.",
        "Simulated router access control lists (ACLs) to restrict unauthorized subnet traversal.",
        "Documented service vulnerability findings and recommended network hardening measures."
      ],
      tools: ["Nmap", "Wireshark", "Kali Linux", "Cisco Packet Tracer", "TCP/IP"],
      githubUrl: "https://github.com/karandeabhinavcse-code",
      reportUrl: null,
      pocs: [
        {
          title: "Nmap Service Enumeration Command",
          vulnerability: "Exposed Unencrypted Services",
          severity: "Medium",
          code: "nmap -sV -sC -p- -T4 192.168.1.0/24 -oN network_audit.txt",
          impact: "Identified outdated service versions and unencrypted communication ports across lab hosts."
        }
      ]
    },
    {
      id: "android-app-security",
      title: "Android Application Security Assessment",
      target: "Android APK Test Environment",
      period: "2024",
      type: "Android Application Security Assessment",
      objective: "Performed static and dynamic security analysis of an Android application in a controlled testing environment.",
      summary: "Decompiled target Android APK files to evaluate manifest permissions, hardcoded secrets, and network communication security using reverse engineering tools.",
      highlights: [
        "Decompiled APK binary using JADX to inspect source code and manifest components.",
        "Analyzed application permissions and potential storage leakage risks.",
        "Configured Burp Suite HTTP proxy with ADB emulator for HTTPS traffic analysis.",
        "Tested basic SSL pinning bypass techniques using dynamic hooking concepts."
      ],
      tools: ["Android VAPT", "ADB", "APK Analysis", "JADX-GUI", "Burp Suite"],
      githubUrl: "https://github.com/karandeabhinavcse-code",
      reportUrl: null,
      pocs: [
        {
          title: "ADB Application Inspection",
          vulnerability: "Insecure Local Storage",
          severity: "Medium",
          code: "adb shell run-as com.example.app cat /data/data/com.example.app/shared_prefs/user.xml",
          impact: "Audited local storage practices for unencrypted session data."
        }
      ]
    },
    {
      id: "python-security-script",
      title: "Python Security & Network Scanning Utility",
      target: "Personal / Academic Scripting Lab",
      period: "2024 - 2025",
      type: "Python Security Project",
      objective: "Developing custom Python utilities to automate basic network port scanning, header inspection, and log analysis.",
      summary: "Created Python scripts using socket and requests libraries to perform multi-threaded port scans and check target Web servers for missing security response headers.",
      highlights: [
        "Built custom port scanner script utilizing Python socket module.",
        "Implemented HTTP header security checker for missing Security Headers (HSTS, CSP, X-Frame-Options).",
        "Designed clean command-line outputs for quick security auditing."
      ],
      tools: ["Python", "Sockets", "Requests", "Linux Terminal"],
      githubUrl: "https://github.com/karandeabhinavcse-code",
      reportUrl: null,
      pocs: []
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
