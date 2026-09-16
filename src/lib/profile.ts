import { z } from "zod";

const socialSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const skillGroupSchema = z.object({
  group: z.string(),
  items: z.array(z.string()),
});

const experienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  period: z.string(),
  location: z.string(),
  summary: z.string(),
  highlights: z.array(z.string()),
});

const educationSchema = z.object({
  id: z.string(),
  school: z.string(),
  degree: z.string(),
  period: z.string(),
  detail: z.string(),
});

const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  year: z.string(),
  summary: z.string(),
  description: z.string(),
  href: z.string(),
  image: z.string(),
  problem: z.string().default(""),
  constraint: z.string().default(""),
  decision: z.string().default(""),
  result: z.string().default(""),
  stack: z.array(z.string()).default([]),
});

const extraItemSchema = z.object({
  label: z.string(),
  meta: z.string(),
});

const extraSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  items: z.array(extraItemSchema),
});

export const profileSchema = z.object({
  name: z.string(),
  role: z.string(),
  location: z.string(),
  email: z.string(),
  phone: z.string(),
  website: z.string(),
  availability: z.string(),
  tagline: z.string(),
  bio: z.string(),
  portrait: z.string(),
  socials: z.array(socialSchema),
  skills: z.array(skillGroupSchema),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  projects: z.array(projectSchema),
  extras: z.array(extraSectionSchema),
});

export type Profile = z.infer<typeof profileSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ExtraSection = z.infer<typeof extraSectionSchema>;

export const DEFAULT_PROFILE: Profile = {
  name: "Soham Ray",
  role: "Software Engineer",
  location: "Siliguri, West Bengal",
  email: "sohamray51@gmail.com",
  phone: "+91 8670415041",
  website: "github.com/spellblade",
  availability:
    "Open to backend, full-stack, and platform Software Engineer roles · also Data Engineer roles covering batch pipelines and SQL",
  tagline:
    "I build production services and the data paths underneath them — Java at Cerner, TypeScript and Python on public repos since.",
  bio: "Software Engineer / Software Developer I with 2 years 9 months at Cerner Healthcare Solutions (Data Foundations) building production Java services, plus CI/CD (Jenkins, Spinnaker), Git-based releases, and production support. MCA, NIT Jamshedpur.\n\nSince November 2022 I have been doing independent full-stack engineering: TypeScript, React, Node.js, Express.js, Python, FastAPI, REST APIs, and PostgreSQL. Public work lives at github.com/spellblade.",
  portrait: "/images/portrait.jpg",
  socials: [
    { label: "Email", href: "mailto:sohamray51@gmail.com" },
    { label: "GitHub", href: "https://github.com/spellblade" },
  ],
  skills: [
    {
      group: "Languages",
      items: ["Java", "TypeScript", "JavaScript", "Python", "SQL", "C++", "PowerShell"],
    },
    {
      group: "Backend & data",
      items: [
        "Hadoop",
        "HBase",
        "Apache Avro",
        "ETL / batch pipelines",
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "FastAPI",
        "REST APIs",
        "WebSocket",
      ],
    },
    {
      group: "Frontend",
      items: ["React", "HTML", "CSS", "IndexedDB", "Node.js", "Express.js"],
    },
    {
      group: "Cloud & delivery",
      items: ["Git", "GitHub", "Jenkins", "Spinnaker", "DC/OS", "Vercel", "Neon", "Splunk"],
    },
    {
      group: "Practice",
      items: [
        "Production support",
        "CI/CD",
        "Unit testing",
        "Monitoring",
        "Incident management",
        "Dependency hardening",
      ],
    },
  ],
  experience: [
    {
      id: "exp-cerner",
      company: "Cerner Healthcare Solutions India Pvt. Ltd.",
      role: "Software Developer I  ·  Data Foundations",
      period: "23 Dec 2019 — 14 Oct 2022",
      location: "Bangalore  ·  2 years 9 months",
      summary:
        "Production Java services on Data Foundations: Avro contracts, HBase/Hadoop transformation, CI/CD, and operations support.",
      highlights: [
        "Software development in Java: transformation classes that applied HBase normalization and standardization rules in production services.",
        "Data modeling with Apache Avro schemas so record contracts stayed consistent across the Hadoop / HBase stack.",
        "CI/CD and release engineering: Jenkins, Spinnaker, and DC/OS deployments to multiple production environments; Git for source control.",
        "Production support on live Hadoop / HBase services; met the operations SLA of 20 support tickets per month.",
        "Monitoring and incident management with Splunk during releases and ticket work.",
        "Caught platform defects in ops monitoring before they became user-facing incidents.",
        "Dependency hardening and vulnerability remediation on production application stacks.",
      ],
    },
    {
      id: "exp-independent",
      company: "Independent engineering",
      role: "Software Engineer",
      period: "Nov 2022 — Present",
      location: "Public repositories  ·  github.com/spellblade",
      summary:
        "Independent full-stack work: TypeScript, React, Python, FastAPI, REST APIs, PostgreSQL. TradePulse, Imprint, Cloud Copy, Soham Ray Studio, TarangStream, Grok Chat Log Analytics.",
      highlights: [
        "Shipped public products with TypeScript, React, Node/Express, Python/FastAPI, and PostgreSQL.",
        "Built a portfolio/CV platform (Studio editor, PDF export) on Vercel + Neon.",
        "Shipped client-side ETL and analytics over export archives, plus a dual-cloud file-transfer pipeline with live progress.",
      ],
    },
  ],
  education: [
    {
      id: "edu-mca",
      school: "National Institute of Technology, Jamshedpur",
      degree: "Master of Computer Applications (MCA)",
      period: "7.70 CGPA",
      detail: "",
    },
    {
      id: "edu-bca",
      school: "Siliguri Institute of Technology, Siliguri",
      degree: "Bachelor of Computer Applications (BCA)",
      period: "7.81 CGPA",
      detail: "",
    },
  ],
  projects: [
    {
      id: "soham-ray-studio",
      title: "Soham Ray Studio",
      category: "Product",
      year: "2026",
      summary: "Full-stack portfolio and CV platform: Studio editor, PDF export, Vercel + Neon.",
      description:
        "An editorial portfolio with a passphrase-locked Studio, case-study pages, and a browser PDF export of the same profile stored in Postgres.",
      href: "https://github.com/spellblade/soham-ray-studio",
      image: "/images/project-folio.jpg",
      problem:
        "A CV needed to be a public site and a maintainable document, without putting the editor behind a public Google or X login.",
      constraint:
        "Single-tenant deploy. Studio access had to stay a private key. Hosting on Vercel Hobby with Neon Postgres.",
      decision:
        "Vite + React Router + a JSONB profile row. Studio is claimed with a PBKDF2 passphrase. PDF is generated client-side from the published profile.",
      result:
        "Public site, private editor, durable saves on Neon. Source: github.com/spellblade/soham-ray-studio.",
      stack: ["TypeScript", "React", "PostgreSQL", "Vercel", "Neon"],
    },
    {
      id: "imprint",
      title: "Imprint",
      category: "Product",
      year: "2026",
      summary: "Local-first form-fill product: identity vault, field mapping, Chrome/Edge MV3 extension.",
      description:
        "A form-fill product with a local identity vault, heuristic plus optional AI field mapping, and a Manifest V3 extension for Chrome and Edge.",
      href: "https://github.com/spellblade/imprint",
      image: "/images/project-meridian.jpg",
      problem:
        "Filling the same identity across sites meant copy-paste and leaking data into cloud form-fillers.",
      constraint:
        "Keep the vault local-first. Support Chrome and Edge without a server that stores PII.",
      decision:
        "MV3 extension plus a TypeScript identity vault. Heuristic mapping first; optional AI mapping as a second pass.",
      result:
        "Public TypeScript repo with local vault and dual-browser extension. github.com/spellblade/imprint",
      stack: ["TypeScript", "Chrome MV3", "Edge"],
    },
    {
      id: "tradepulse",
      title: "TradePulse",
      category: "Product",
      year: "2026",
      summary: "Front-end market-data terminal: BSE, NSE, MCX simulation, charts, screener, portfolio state.",
      description:
        "In-browser market-data application with BSE, NSE, and MCX price simulation, screener, technical charts, and portfolio revaluation.",
      href: "https://github.com/spellblade/tradepulse",
      image: "/images/project-northline.jpg",
      problem:
        "Needed a high-frequency simulated Indian exchange UI without paying for live market feeds.",
      constraint:
        "Client-side only. Had to stay smooth enough for a screener and charts in the browser.",
      decision:
        "TypeScript / React terminal with an in-browser store, simulated ticks, and Recharts-style analytics.",
      result:
        "Public market-data terminal with screener and portfolio revaluation. github.com/spellblade/tradepulse",
      stack: ["TypeScript", "React"],
    },
    {
      id: "tarangstream",
      title: "TarangStream",
      category: "Product",
      year: "2026",
      summary: "Network diagnostics UI and API: multi-stream download/upload, latency, jitter.",
      description:
        "Network diagnostics with multi-stream download and upload tests, latency, jitter, and time-series smoothing.",
      href: "https://github.com/spellblade/tarangstream-speed-test",
      image: "/images/project-quiet.jpg",
      problem:
        "A single-stream speed test hid variance. Needed download, upload, latency, and jitter in one view.",
      constraint:
        "Browser plus a small Node/Express API. Results had to be readable as a time series, not one number.",
      decision:
        "Multi-stream tests with a React UI and Express REST backend; smooth the series instead of flashing raw spikes.",
      result:
        "Public diagnostics app. github.com/spellblade/tarangstream-speed-test",
      stack: ["TypeScript", "React", "Node.js", "Express", "REST"],
    },
    {
      id: "grok-chat-log-analytics",
      title: "Grok Chat Log Analytics",
      category: "Open source",
      year: "2026",
      summary: "Local-first ETL of X/xAI export archives: parse, transform, dashboard, IndexedDB.",
      description:
        "Client-side parser, search, and analytics dashboard over Grok export JSON, persisted in IndexedDB.",
      href: "https://github.com/spellblade/grok-chat-log-analytics",
      image: "/images/project-field.jpg",
      problem:
        "Grok / X export archives are large JSON dumps. There was no local way to parse, search, and chart them.",
      constraint:
        "No server. Data stays in the browser. Must tolerate messy export shapes.",
      decision:
        "TypeScript ETL in the client: parse, transform, dashboard, IndexedDB persistence.",
      result:
        "Local-first analytics over export archives. github.com/spellblade/grok-chat-log-analytics",
      stack: ["TypeScript", "React", "IndexedDB"],
    },
    {
      id: "cloud-copy",
      title: "Cloud Copy",
      category: "Platform",
      year: "2026",
      summary: "File-transfer pipeline between MEGA and PikPak: queued jobs, retry/cancel, live progress.",
      description:
        "Python / FastAPI dual-pane transfer app with a job queue, retry and cancel, WebSocket progress, and REST control.",
      href: "https://github.com/spellblade/Cloud-Copy",
      image: "/images/project-harbor.jpg",
      problem:
        "Moving files between MEGA and PikPak meant manual downloads and no visibility into queued work.",
      constraint:
        "Long-running transfers. Needed retry, cancel, and live progress without blocking the API.",
      decision:
        "FastAPI + REST for job control, WebSocket for progress, a queue with retry/cancel.",
      result:
        "Public transfer pipeline. github.com/spellblade/Cloud-Copy",
      stack: ["Python", "FastAPI", "REST", "WebSocket"],
    },
  ],
  extras: [
    {
      id: "certifications",
      title: "Certifications",
      items: [
        { label: "Data Science Orientation", meta: "Coursera" },
        {
          label: "Stock Market Using AI Workshop",
          meta: "SpringPad, June 2025 — analysis, pattern identification, strategy backtesting",
        },
        {
          label: "Runner-up, Project Exhibition 2015",
          meta: "Article on Wireshark published in the college newsletter",
        },
      ],
    },
    {
      id: "other-work",
      title: "Also",
      items: [
        {
          label: "WinForge",
          meta: "PowerShell diagnostics toolkit — github.com/spellblade/WinForge",
        },
      ],
    },
  ],
};

export function parseProfile(raw: unknown): Profile {
  const parsed = profileSchema.safeParse(raw);
  return parsed.success ? parsed.data : DEFAULT_PROFILE;
}

export function newId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}
