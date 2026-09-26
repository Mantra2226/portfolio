"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, Database, Network } from "lucide-react";

interface SkillCategory {
  category: string;
  icon: typeof Terminal;
  skills: string[];
}

const TECH_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages & Core",
    icon: Terminal,
    skills: ["Python", "TypeScript", "JavaScript", "Go (Golang)", "SQL", "Bash"],
  },
  {
    category: "Frameworks & Backend Engines",
    icon: Cpu,
    skills: [
      "FastAPI",
      "Django / DRF",
      "Next.js (App Router)",
      "React",
      "Node.js",
      "Express",
      "Tailwind CSS",
    ],
  },
  {
    category: "Databases, In-Memory Cache & Storage",
    icon: Database,
    skills: ["PostgreSQL", "TimescaleDB", "Redis", "SQLite"],
  },
  {
    category: "Infrastructure, IoT & Cloud Integrations",
    icon: Network,
    skills: [
      "Docker",
      "Linux / Unix",
      "Safaricom Daraja 2.0 (M-Pesa STK)",
      "IoT Sensor Telemetry",
      "Git & GitHub Actions",
      "RESTful APIs & GraphQL",
      "Microservices Architecture",
    ],
  },
];

export function TechStack() {
  return (
    <section aria-labelledby="tech-stack-heading" className="space-y-6">
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800/80 pb-3">
        <Cpu className="w-4 h-4 text-emerald-500" />
        <h2
          id="tech-stack-heading"
          className="text-sm font-mono uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-semibold"
        >
          Technical Capabilities &amp; Stack
        </h2>
      </div>

      <div className="space-y-6">
        {TECH_CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="space-y-2.5"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 font-medium">
                <Icon className="w-3.5 h-3.5 text-emerald-500" />
                <span>{cat.category}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ y: -2, scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mono border border-zinc-200/90 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xs text-zinc-700 dark:text-zinc-300 hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:text-emerald-700 dark:hover:text-emerald-400 hover:shadow-xs transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
