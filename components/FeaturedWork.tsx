"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { FeaturedProject, FEATURED_PROJECTS } from "@/lib/projects-data";

interface FeaturedWorkProps {
  projects?: FeaturedProject[];
}

export function FeaturedWork({ projects = FEATURED_PROJECTS }: FeaturedWorkProps) {
  return (
    <section aria-labelledby="featured-work-heading" className="space-y-6">
      <div className="flex items-baseline justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <h2
            id="featured-work-heading"
            className="text-sm font-mono uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-semibold"
          >
            Flagship Engineering &amp; Architecture
          </h2>
        </div>
        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
          {projects.length} core systems
        </span>
      </div>

      <div className="space-y-5">
        {projects.map((project, idx) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            whileHover={{ y: -3 }}
            className="group relative p-6 sm:p-7 rounded-xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/70 dark:bg-[#121215]/80 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_0_25px_rgba(16,185,129,0.1)] overflow-hidden"
          >
            {/* Subtle corner glow accent on hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

            <div className="relative space-y-4">
              {/* Header with Title and External Links */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    {project.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start pt-0.5">
                  {project.liveUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                      title="View live demo"
                    >
                      <span>Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </motion.a>
                  )}

                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-colors"
                    title="View source on GitHub"
                  >
                    <GitHubIcon className="w-3.5 h-3.5" />
                    <span>Repository</span>
                  </motion.a>
                </div>
              </div>

              {/* Problem / Solution Narrative */}
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {project.description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-medium">
                  Architecture &amp; System Impact
                </span>
                <ul className="space-y-1.5">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture badges */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {project.architecture.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/70 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
