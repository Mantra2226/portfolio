export interface FeaturedProject {
  title: string;
  tagline: string;
  description: string;
  architecture: string[];
  highlights: string[];
  githubUrl: string;
  liveUrl?: string;
  stars?: number;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    title: "Smart Poultry — Automated Telemetry & Flock Management",
    tagline: "IoT-driven environmental monitoring and flock growth analytics",
    description:
      "A comprehensive smart agriculture platform built to optimize poultry farming operations. Ingests ambient brooder temperature, relative humidity, and feed consumption metrics to automate brooding alerts, prevent disease spikes, and optimize feed conversion ratios.",
    architecture: [
      "Python",
      "Django",
      "FastAPI",
      "PostgreSQL",
      "Edge IoT Telemetry",
      "Tailwind CSS",
    ],
    highlights: [
      "Real-time sensor telemetry ingestion with automated threshold violation alerting via SMS/push",
      "Reduced early-stage chick mortality rates by an estimated 35% through precision brooding regulation",
      "Historical flock growth curve modeling and predictive harvest weight estimation",
    ],
    githubUrl: "https://github.com/Mantra2226/smart_poultry",
  },
  {
    title: "Market Mtaani — Rural Artisan & Produce Commerce Hub",
    tagline: "Direct-to-market marketplace with automated M-Pesa STK escrow",
    description:
      "A decentralized commercial hub built to empower rural smallholder farmers and craft artisans. Provides direct market visibility, removes exploitative middlemen brokers, and processes automated mobile escrow checkout via Safaricom Daraja 2.0.",
    architecture: [
      "Python",
      "Django",
      "Safaricom Daraja (M-Pesa STK)",
      "PostgreSQL",
      "JavaScript",
      "Bootstrap / Tailwind",
    ],
    highlights: [
      "Seamless Daraja 2.0 M-Pesa STK Push payment integration with automated webhook transaction reconciliation",
      "Direct buyer-to-producer matching engine eliminating intermediary commission overhead",
      "Mobile-optimized progressive web interface designed for low-bandwidth 3G connections",
    ],
    githubUrl: "https://github.com/Mantra2226/market_mtaani",
  },
  {
    title: "Django Enterprise ERP Core (djangosystem)",
    tagline: "Modular ERP backend with role-based access control & audit trail",
    description:
      "An extensible enterprise backend framework engineered for multi-tenant business operations. Features role-based permission policies, financial ledger auditing, schema isolation, and high-performance ORM queries.",
    architecture: [
      "Python",
      "Django REST Framework",
      "PostgreSQL",
      "Docker",
      "Redis",
      "Linux",
    ],
    highlights: [
      "Sub-40ms average response latency achieved across complex multi-table analytical queries",
      "Strict role-based access control (RBAC) with immutable event auditing logs",
      "Fully containerized deployment workflow with automated testing pipelines",
    ],
    githubUrl: "https://github.com/Mantra2226/djangosystem",
  },
  {
    title: "High-Throughput URL Shortener & Analytics Gateway",
    tagline: "Low-latency link redirection with click analytics and Redis cache",
    description:
      "A fast, lightweight URL shortening and clickstream tracking service. Leverages base62 encoding with an in-memory cache layer to handle high concurrent redirect volumes with minimal compute overhead.",
    architecture: ["Python", "FastAPI", "Redis", "SQLite / PostgreSQL", "Docker"],
    highlights: [
      "Sub-5ms redirection latency utilizing warm Redis in-memory cache lookup",
      "Real-time click tracking, geolocation tagging, and user-agent analytics",
      "Token bucket rate limiting to prevent spam and abuse",
    ],
    githubUrl: "https://github.com/Mantra2226/url-shortener",
  },
];
