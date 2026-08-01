import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Static folder for uploaded tools & zip files
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB max file size
});

// MongoDB Atlas Connection
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('[DB] Connected to Abhinav Karande MongoDB Atlas Cluster successfully.');
    await seedProjectsIfEmpty();
    await seedToolsIfEmpty();
    await seedNewsIfEmpty();
  })
  .catch(err => console.error('[DB] MongoDB Connection Error:', err));

// Mongoose Schema for Contact Messages
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ContactMessage = mongoose.model('ContactMessage', ContactSchema);

// Mongoose Schema for Portfolio Projects
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  target: { type: String, required: true },
  period: { type: String, default: '2024 - 2025' },
  type: { type: String, default: 'Web & API Security' },
  summary: { type: String, required: true },
  highlights: [{ type: String }],
  severityBreakdown: {
    critical: { type: Number, default: 0 },
    high: { type: Number, default: 0 },
    medium: { type: Number, default: 0 }
  },
  tools: [{ type: String }],
  reportUrl: { type: String, default: 'https://drive.google.com/file/d/1KLZQvENVGNpCsrxBUXEXGx3mcQzZ0j53/view?usp=sharing' },
  pocs: [{
    title: String,
    vulnerability: String,
    severity: String,
    code: String,
    impact: String
  }],
  uploaderEmail: { type: String, default: '' },
  uploaderName: { type: String, default: 'Admin' },
  isUserUpload: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', ProjectSchema);

// Mongoose Schema for Security & Hacking Tools
const ToolSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'VAPT Utility' }, // Web VAPT, Network Scanner, Exploit PoC, Mobile Audit
  description: { type: String, required: true },
  language: { type: String, default: 'Python / Bash' },
  version: { type: String, default: '1.0.0' },
  fileUrl: { type: String }, // Local upload path or external link
  fileName: { type: String }, // Original file name
  fileSize: { type: String }, // File size string e.g. "2.4 MB"
  githubUrl: { type: String },
  documentation: { type: String },
  commandUsage: { type: String },
  tags: [{ type: String }],
  uploaderEmail: { type: String, default: '' },
  uploaderName: { type: String, default: 'Admin' },
  isUserUpload: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const SecurityTool = mongoose.model('SecurityTool', ToolSchema);

// Mongoose Schema for User Uploaded Resumes / CVs
const ResumeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  uploaderName: { type: String, required: true },
  uploaderEmail: { type: String, required: true },
  category: { type: String, default: 'Software Engineer / Security' },
  description: { type: String },
  fileUrl: { type: String },
  fileName: { type: String },
  fileSize: { type: String },
  githubUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const ResumeSubmission = mongoose.model('ResumeSubmission', ResumeSchema);

// Mongoose Schema for Daily Cyber Security & Hacking News Articles
const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  source: { type: String, default: 'The Hacker News' },
  sourceUrl: { type: String, default: '' },
  category: { type: String, default: 'Zero-Day Exploit' },
  severity: { type: String, default: 'HIGH' },
  summary: { type: String, required: true },
  content: { type: String },
  url: { type: String },
  imageUrl: { type: String, default: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80' },
  publishedAt: { type: Date, default: Date.now },
  author: { type: String, default: 'Cyber Intelligence Desk' },
  tags: [{ type: String }],
  uploaderEmail: { type: String, default: '' },
  uploaderName: { type: String, default: 'The Hacker News Feed' },
  isUserUpload: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const NewsArticle = mongoose.model('NewsArticle', NewsSchema);

// --- NODEMAILER EMAIL NOTIFICATION HELPER ---
async function sendUploadNotificationEmail({ uploadType, title, uploaderEmail, uploaderName, category, description, fileUrl, externalUrl }) {
  const recipientEmails = 'karandeabhinav@gmail.com, karandeabhinavcse@gmail.com';
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  console.log(`\n======================================================`);
  console.log(`[EMAIL NOTIFICATION TRIGGERED]`);
  console.log(`Upload Type: ${uploadType}`);
  console.log(`Title: "${title}"`);
  console.log(`Sender Name: ${uploaderName || 'Visitor Contributor'}`);
  console.log(`Sender Email: ${uploaderEmail}`);
  console.log(`Target/Category: ${category || 'General'}`);
  console.log(`Recipient Emails: ${recipientEmails}`);
  console.log(`======================================================\n`);

  if (!emailUser || !emailPass) {
    console.log(`[EMAIL NOTICE] EMAIL_USER / EMAIL_PASS not set in .env. Logged email details to console above.`);
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #0b1120; color: #f8fafc; padding: 28px; border-radius: 16px; max-width: 620px; margin: 0 auto; border: 1px solid #1e293b; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
        <div style="border-bottom: 2px solid #00f0ff; padding-bottom: 14px; margin-bottom: 20px;">
          <h2 style="color: #00f0ff; margin: 0; font-size: 20px;">🚨 New ${uploadType} Upload Alert</h2>
          <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">Abhinav.Sec Portfolio API Notification System</p>
        </div>

        <div style="background-color: #162032; padding: 18px; border-radius: 12px; margin-bottom: 18px; border-left: 4px solid #00ff9d;">
          <h3 style="color: #00ff9d; margin: 0 0 12px 0; font-size: 15px;">👤 Sender / Uploader Information</h3>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Sender Name:</strong> <span style="color: #ffffff; font-weight: 700;">${uploaderName || 'Visitor Contributor'}</span></p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Sender Email:</strong> <a href="mailto:${uploaderEmail}" style="color: #38bdf8; font-weight: 700; text-decoration: underline;">${uploaderEmail}</a></p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Timestamp:</strong> <span style="color: #cbd5e1;">${new Date().toLocaleString()}</span></p>
        </div>

        <div style="background-color: #162032; padding: 18px; border-radius: 12px; margin-bottom: 18px; border-left: 4px solid #00f0ff;">
          <h3 style="color: #00f0ff; margin: 0 0 12px 0; font-size: 15px;">📦 ${uploadType} Payload Details</h3>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Title:</strong> <span style="color: #ffffff; font-weight: 700;">${title}</span></p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Category / Topic:</strong> <span style="color: #a855f7; font-weight: 700;">${category || 'General'}</span></p>
          
          <p style="margin: 12px 0 4px 0; font-size: 14px; color: #94a3b8;"><strong>Description / Summary:</strong></p>
          <div style="background-color: #0b1120; padding: 12px 14px; border-radius: 8px; color: #cbd5e1; font-size: 13.5px; line-height: 1.5; border: 1px solid rgba(255,255,255,0.08);">
            ${description}
          </div>

          ${externalUrl ? `<p style="margin: 12px 0 0 0; font-size: 14px;"><strong>External GitHub URL:</strong> <a href="${externalUrl}" target="_blank" style="color: #38bdf8; font-weight: 600;">${externalUrl}</a></p>` : ''}
          ${fileUrl ? `<p style="margin: 12px 0 0 0; font-size: 14px;"><strong>Attached Document / File:</strong> <a href="${fileUrl}" target="_blank" style="color: #00ff9d; font-weight: 600;">${fileUrl}</a></p>` : ''}
        </div>

        <div style="text-align: center; margin-top: 24px; padding-top: 14px; border-top: 1px solid #1e293b; color: #64748b; font-size: 12px;">
          This notification was sent automatically to <strong>karandeabhinav@gmail.com</strong> and <strong>karandeabhinavcse@gmail.com</strong> from Abhinav Karande Security Portfolio API.
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Abhinav.Sec Portfolio" <${emailUser}>`,
      to: recipientEmails,
      replyTo: uploaderEmail,
      subject: `🚨 [New ${uploadType}] "${title}" from ${uploaderName || uploaderEmail}`,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[EMAIL SUCCESS] Notification email sent to ${recipientEmails}. MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('[EMAIL ERROR] Failed sending notification email:', err.message);
    return { success: false, error: err.message };
  }
}

// Seed Projects
const defaultSeedProjects = [
  {
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
    title: "Android VAPT & SSL Pinning Bypass Framework",
    target: "Android APK Test Environment",
    period: "2024",
    type: "Mobile Security",
    severityBreakdown: { critical: 1, high: 3, medium: 2 },
    reportUrl: "https://drive.google.com/file/d/17uzlAmnafOpMkg_QWuc7ZUYQEQAQVbnY/view",
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
    title: "Enterprise Multi-VLAN & Routed Network Architecture",
    target: "Cisco Packet Tracer / GNS3 Topology",
    period: "2024",
    type: "Network Infrastructure",
    severityBreakdown: { critical: 0, high: 1, medium: 4 },
    reportUrl: "https://drive.google.com/file/d/17uzlAmnafOpMkg_QWuc7ZUYQEQAQVbnY/view",
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
];

// Seed Tools
const defaultSeedTools = [
  {
    title: "Frida SSL Pinning Automator",
    category: "Mobile Security Utility",
    description: "Automated Frida dynamic hook injector designed for Android VAPT to bypass custom X509 TrustManager SSL certificate pinning.",
    language: "JavaScript / Python",
    version: "2.1.0",
    commandUsage: "python frida_bypass.py --package com.example.app --script ssl_hook.js",
    tags: ["Android VAPT", "Frida", "SSL Pinning", "Mobile Security"],
    fileUrl: "",
    fileName: "frida_ssl_bypass_v2.zip",
    fileSize: "1.2 MB"
  },
  {
    title: "OWASP CSTI & SSTI Audit Scanner",
    category: "Web VAPT Scanner",
    description: "Lightweight multi-threaded template injection auditor built to detect Client-Side and Server-Side Template Injection vulnerabilities.",
    language: "Python 3",
    version: "1.4.2",
    commandUsage: "python template_scan.py -u https://target.local/search -p payload_list.txt",
    tags: ["CSTI", "SSTI", "OWASP 2025", "Python", "VAPT"],
    fileUrl: "",
    fileName: "template_injection_scanner.zip",
    fileSize: "850 KB"
  },
  {
    title: "Cisco OSPF & Subnet Auditor",
    category: "Network Infrastructure Tool",
    description: "Automated Cisco IOS configuration analyzer for verifying OSPF Area 0 routing tables and VLAN trunking security rules.",
    language: "Bash / Python",
    version: "1.0.0",
    commandUsage: "./audit_cisco.sh --config router_running.cfg --vlan-check",
    tags: ["CCNA", "Cisco IOS", "Network Security", "OSPF", "VLAN"],
    fileUrl: "",
    fileName: "cisco_network_auditor.zip",
    fileSize: "2.1 MB"
  }
];

async function seedProjectsIfEmpty() {
  try {
    const count = await Project.countDocuments();
    if (count === 0) {
      console.log('[DB] Seeding initial resume projects into MongoDB Atlas...');
      await Project.insertMany(defaultSeedProjects);
    }
  } catch (err) {
    console.error('[DB Seed Error]', err);
  }
}

async function seedToolsIfEmpty() {
  try {
    const count = await SecurityTool.countDocuments();
    if (count === 0) {
      console.log('[DB] Seeding initial security tools into MongoDB Atlas...');
      await SecurityTool.insertMany(defaultSeedTools);
    }
  } catch (err) {
    console.error('[DB Seed Tools Error]', err);
  }
}

const defaultSeedNews = [
  {
    title: "Critical Zero-Day Flaw Exploited in Enterprise VPN Gateway Allows Unauthenticated RCE",
    source: "The Hacker News",
    sourceUrl: "https://thehackernews.com",
    category: "Zero-Day Exploit",
    severity: "CRITICAL",
    summary: "Threat actors are actively exploiting an unpatched zero-day vulnerability in leading enterprise VPN appliances to execute arbitrary code with elevated root privileges.",
    content: "Security researchers have alerted enterprise IT security teams regarding active exploitation of a zero-day memory corruption vulnerability affecting enterprise VPN hardware. Attackers can trigger buffer overflow via custom-crafted HTTP POST headers without authentication. CISA has issued an emergency directive urging organizations to implement temporary firewall block rules immediately while patches are deployed.",
    url: "https://thehackernews.com/2026/08/critical-zero-day-vpn-rce.html",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    author: "Cyber Intelligence Unit",
    tags: ["VPN", "RCE", "Zero-Day", "CISA Alert", "Enterprise"]
  },
  {
    title: "Sophisticated AI-Driven Ransomware Targeted Global Logistics Provider",
    source: "BleepingComputer",
    sourceUrl: "https://bleepingcomputer.com",
    category: "Ransomware Attack",
    severity: "HIGH",
    summary: "A new ransomware variant utilizes automated LLM scripts for real-time internal credential harvesting and shadow volume deletion across Active Directory networks.",
    content: "Incident responders at BleepingComputer report a novel ransomware campaign targeting major supply chain operators. The malware leverages automated machine learning routines to bypass EDR detection, mutate file extension signatures dynamically, and exfiltrate sensitive corporate databases prior to payload execution.",
    url: "https://www.bleepingcomputer.com/news/security/ai-ransomware-attacks-global-logistics/",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    author: "Threat Hunter Desk",
    tags: ["Ransomware", "AI Security", "Active Directory", "Data Leak"]
  },
  {
    title: "CISA Releases Emergency Advisory on Critical Cloud API Authentication Bypass",
    source: "CISA Advisory",
    sourceUrl: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
    category: "CISA Advisory",
    severity: "CRITICAL",
    summary: "US Cybersecurity and Infrastructure Security Agency adds flaw affecting OAuth2 token validation mechanisms across multi-tenant cloud storage services to KEV catalog.",
    content: "CISA has updated its Known Exploited Vulnerabilities (KEV) catalog with CVE-2026-8841. The flaw allows malicious actors to forge JWT claims due to improper cryptographic signature verification in OAuth2 endpoints. Federal agencies are mandated to patch within 48 hours.",
    url: "https://www.cisa.gov/news-events/cybersecurity-advisories",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date(Date.now() - 11 * 60 * 60 * 1000),
    author: "CISA Cyber Division",
    tags: ["CISA", "OAuth2", "Cloud Security", "JWT Bypass"]
  }
];

async function seedNewsIfEmpty() {
  try {
    const count = await NewsArticle.countDocuments();
    if (count === 0) {
      console.log('[DB] Seeding initial cyber news into MongoDB Atlas...');
      await NewsArticle.insertMany(defaultSeedNews);
    }
  } catch (err) {
    console.error('[DB Seed News Error]', err);
  }
}

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    dbState: mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED',
    cluster: 'Cluster0.gnkkezh.mongodb.net',
    timestamp: new Date()
  });
});

// Admin Auth Endpoint
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === 'admin123' || password === 'abhinav2025' || password === 'admin') {
    res.json({ success: true, token: 'sec_admin_token_2025_ok' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid Admin Passcode.' });
  }
});

// --- SECURITY TOOLS & ZIP FILE UPLOAD ENDPOINTS ---

// POST Upload Zip / Tool File Endpoint
app.post('/api/tools/upload', upload.single('toolFile'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded.' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const fileSize = (req.file.size / (1024 * 1024)).toFixed(2) + ' MB';

    console.log(`[FILE] Tool uploaded: ${req.file.originalname} -> ${req.file.filename}`);

    res.json({
      success: true,
      fileUrl,
      fileName: req.file.originalname,
      fileSize
    });
  } catch (err) {
    console.error('[Upload Error]', err);
    res.status(500).json({ success: false, error: 'File upload failed.' });
  }
});

// --- DAILY CYBER SECURITY & HACKING NEWS ENDPOINTS ---

// GET All Cyber Security News
app.get('/api/news', async (req, res) => {
  try {
    const news = await NewsArticle.find().sort({ publishedAt: -1, createdAt: -1 });
    res.json({ success: true, count: news.length, news });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch cyber news.' });
  }
});

// POST Create / Publish Cyber News Article
app.post('/api/news', async (req, res) => {
  try {
    const newsData = req.body;
    if (!newsData.title || !newsData.summary) {
      return res.status(400).json({ success: false, error: 'Title and Summary are required.' });
    }

    const newArticle = new NewsArticle({
      ...newsData,
      isUserUpload: true
    });
    await newArticle.save();

    console.log(`[DB] Cyber News Published: "${newArticle.title}" by ${newArticle.uploaderEmail || newArticle.uploaderName || 'Admin'}`);

    if (newArticle.uploaderEmail) {
      sendUploadNotificationEmail({
        uploadType: 'Cyber Security News Article',
        title: newArticle.title,
        uploaderEmail: newArticle.uploaderEmail,
        uploaderName: newArticle.uploaderName || 'News Reporter',
        category: newArticle.category,
        description: newArticle.summary,
        fileUrl: newArticle.url || newArticle.imageUrl,
        externalUrl: newArticle.url
      });
    }

    res.status(201).json({
      success: true,
      message: 'Cyber security news article published successfully!',
      news: newArticle
    });
  } catch (err) {
    console.error('[Publish News Error]', err);
    res.status(500).json({ success: false, error: 'Failed to publish news article.' });
  }
});

// DELETE Cyber News Article
app.delete('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await NewsArticle.findByIdAndDelete(id);
    res.json({ success: true, message: 'News article deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete news article.' });
  }
});

// GET Fetch All Security Tools
app.get('/api/tools', async (req, res) => {
  try {
    const tools = await SecurityTool.find().sort({ createdAt: -1 });
    res.json({ success: true, count: tools.length, tools });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch security tools.' });
  }
});

// POST Create Security Tool Entry
app.post('/api/tools', async (req, res) => {
  try {
    const toolData = req.body;
    if (!toolData.title || !toolData.description) {
      return res.status(400).json({ success: false, error: 'Title and Description are required.' });
    }

    const newTool = new SecurityTool(toolData);
    await newTool.save();

    console.log(`[DB] New Tool Published: "${newTool.title}" by ${newTool.uploaderEmail || 'Admin'}`);

    // Trigger Email Notification if uploader email is provided
    if (newTool.uploaderEmail) {
      sendUploadNotificationEmail({
        uploadType: 'Security Tool',
        title: newTool.title,
        uploaderEmail: newTool.uploaderEmail,
        uploaderName: newTool.uploaderName,
        category: newTool.category,
        description: newTool.description,
        fileUrl: newTool.fileUrl,
        externalUrl: newTool.githubUrl
      });
    }

    res.status(201).json({
      success: true,
      message: newTool.uploaderEmail
        ? `Security tool published successfully! Database triggered an email notification for (${newTool.uploaderEmail}).`
        : 'Security tool published successfully!',
      tool: newTool
    });
  } catch (err) {
    console.error('[Create Tool Error]', err);
    res.status(500).json({ success: false, error: 'Failed to save security tool.' });
  }
});

// PUT Update Security Tool Entry
app.put('/api/tools/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTool = await SecurityTool.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTool) {
      return res.status(404).json({ success: false, error: 'Security Tool not found.' });
    }
    console.log(`[DB] Tool Updated: "${updatedTool.title}"`);
    res.json({ success: true, message: 'Tool updated successfully!', tool: updatedTool });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update tool.' });
  }
});

// DELETE Security Tool Entry
app.delete('/api/tools/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTool = await SecurityTool.findByIdAndDelete(id);
    if (deletedTool && deletedTool.fileName) {
      const filePath = path.join(uploadsDir, path.basename(deletedTool.fileUrl || ''));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    console.log(`[DB] Tool Deleted ID: ${id}`);
    res.json({ success: true, message: 'Tool deleted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete tool.' });
  }
});

// --- PROJECT ENDPOINTS ---

// GET All Projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, count: projects.length, projects });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch projects from database.' });
  }
});

// POST Create New Project
app.post('/api/projects', async (req, res) => {
  try {
    const projectData = req.body;
    if (!projectData.title || !projectData.target || !projectData.summary) {
      return res.status(400).json({ success: false, error: 'Title, Target, and Summary are required fields.' });
    }

    const newProject = new Project(projectData);
    await newProject.save();

    console.log(`[DB] New Project Created: "${newProject.title}" by ${newProject.uploaderEmail || 'Admin'}`);

    // Trigger Email Notification if uploader email is provided
    if (newProject.uploaderEmail) {
      sendUploadNotificationEmail({
        uploadType: 'Audit Project',
        title: newProject.title,
        uploaderEmail: newProject.uploaderEmail,
        uploaderName: newProject.uploaderName,
        category: newProject.type,
        description: newProject.summary,
        fileUrl: newProject.reportUrl,
        externalUrl: newProject.reportUrl
      });
    }

    res.status(201).json({
      success: true,
      message: newProject.uploaderEmail
        ? `Project created successfully! Database triggered an email notification for (${newProject.uploaderEmail}).`
        : 'Project added successfully!',
      project: newProject
    });
  } catch (err) {
    console.error('[Create Project Error]', err);
    res.status(500).json({ success: false, error: 'Failed to create project.' });
  }
});

// POST Generic Upload Submission Endpoint (Handles Tool, Project & Resume Uploads from Website)
app.post('/api/upload-submission', async (req, res) => {
  try {
    const { uploadType, uploaderEmail, uploaderName, title, category, description, language, version, githubUrl, fileUrl, fileName, fileSize } = req.body;

    if (!uploaderEmail || !title || !description) {
      return res.status(400).json({ success: false, error: 'Uploader email, Title, and Description are required.' });
    }

    let result;
    if (uploadType === 'Resume' || uploadType === 'Resume / CV') {
      const newResume = new ResumeSubmission({
        title,
        uploaderName: uploaderName || 'Visitor',
        uploaderEmail,
        category: category || 'Resume / CV',
        description,
        fileUrl: fileUrl || githubUrl || '',
        fileName: fileName || '',
        fileSize: fileSize || '',
        githubUrl: githubUrl || ''
      });
      await newResume.save();
      result = { type: 'Resume', data: newResume };

      await sendUploadNotificationEmail({
        uploadType: 'Resume / CV',
        title: newResume.title,
        uploaderEmail,
        uploaderName: uploaderName || 'Visitor',
        category: newResume.category,
        description: newResume.description,
        fileUrl: newResume.fileUrl,
        externalUrl: githubUrl
      });
    } else if (uploadType === 'Project' || uploadType === 'Audit Project') {
      const newProject = new Project({
        title,
        target: category || 'Web & API Security',
        type: category || 'Web & API Security',
        summary: description,
        reportUrl: fileUrl || githubUrl || 'https://drive.google.com/file/d/1KLZQvENVGNpCsrxBUXEXGx3mcQzZ0j53/view?usp=sharing',
        uploaderEmail,
        uploaderName: uploaderName || 'Site Contributor',
        isUserUpload: true,
        highlights: ['User uploaded project report submitted via portfolio interface.']
      });
      await newProject.save();
      result = { type: 'Project', data: newProject };

      await sendUploadNotificationEmail({
        uploadType: 'Audit Project',
        title: newProject.title,
        uploaderEmail,
        uploaderName: uploaderName || 'Site Contributor',
        category: newProject.type,
        description: newProject.summary,
        fileUrl: newProject.reportUrl,
        externalUrl: githubUrl
      });
    } else {
      const newTool = new SecurityTool({
        title,
        category: category || 'VAPT Utility',
        description,
        language: language || 'Python / Bash',
        version: version || '1.0.0',
        fileUrl: fileUrl || '',
        fileName: fileName || '',
        fileSize: fileSize || '',
        githubUrl: githubUrl || '',
        uploaderEmail,
        uploaderName: uploaderName || 'Site Contributor',
        isUserUpload: true,
        tags: [category || 'Community Tool', 'User Upload']
      });
      await newTool.save();
      result = { type: 'Security Tool', data: newTool };

      await sendUploadNotificationEmail({
        uploadType: 'Security Tool',
        title: newTool.title,
        uploaderEmail,
        uploaderName: uploaderName || 'Site Contributor',
        category: newTool.category,
        description: newTool.description,
        fileUrl: newTool.fileUrl,
        externalUrl: githubUrl
      });
    }

    res.status(201).json({
      success: true,
      message: `Database upload successful! Notification email triggered to site owner for uploader (${uploaderEmail}).`,
      data: result
    });
  } catch (err) {
    console.error('[Upload Submission Error]', err);
    res.status(500).json({ success: false, error: 'Upload submission failed.' });
  }
});

// GET Admin Submissions (Retrieve all uploaded tools, audit projects, and resumes from MongoDB)
app.get('/api/admin/submissions', async (req, res) => {
  try {
    const tools = await SecurityTool.find({ isUserUpload: true }).sort({ createdAt: -1 });
    const projects = await Project.find({ isUserUpload: true }).sort({ createdAt: -1 });
    const resumes = await ResumeSubmission.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      ownerEmail: 'karandeabhinav@gmail.com',
      googleDriveUrl: 'https://drive.google.com/file/d/1KLZQvENVGNpCsrxBUXEXGx3mcQzZ0j53/view?usp=sharing',
      data: {
        tools,
        projects,
        resumes
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT Update Existing Project
app.put('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ success: false, error: 'Project not found.' });
    }
    console.log(`[DB] Project Updated: "${updatedProject.title}"`);
    res.json({ success: true, message: 'Project updated successfully!', project: updatedProject });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update project.' });
  }
});

// DELETE Project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Project not found.' });
    }
    console.log(`[DB] Project Deleted ID: ${id}`);
    res.json({ success: true, message: 'Project deleted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete project.' });
  }
});

// --- CONTACT MESSAGE ENDPOINTS ---

// POST Save Contact Submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    const newMessage = new ContactMessage({ name, email, subject, message });
    await newMessage.save();

    console.log(`[DB] New Message Received from ${name} (${email})`);

    res.status(201).json({
      success: true,
      message: 'Your message has been securely transmitted and saved to Abhinav Karande database.',
      data: newMessage
    });
  } catch (err) {
    console.error('[API Error]', err);
    res.status(500).json({ error: 'Internal server error while saving message.' });
  }
});

// GET Fetch Contact Messages
app.get('/api/contact', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, messages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

// DELETE Contact Message
app.delete('/api/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ContactMessage.findByIdAndDelete(id);
    res.json({ success: true, message: 'Message deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message.' });
  }
});

app.listen(PORT, () => {
  console.log(`[SERVER] Abhinav Karande Full-Stack Security API running on http://localhost:${PORT}`);
});
