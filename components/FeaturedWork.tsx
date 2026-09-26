"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  X,
  ChevronRight,
  Activity,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { FeaturedProject, FEATURED_PROJECTS } from "@/lib/projects-data";

interface FeaturedWorkProps {
  projects?: FeaturedProject[];
}

export function FeaturedWork({ projects = FEATURED_PROJECTS }: FeaturedWorkProps) {
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <>
      <section aria-labelledby="featured-work-heading" className="space-y-6">
        {/* Header without icon and without count statement */}
        <div className="border-b border-zinc-200 dark:border-zinc-800/80 pb-3">
          <h2
            id="featured-work-heading"
            className="text-sm font-mono uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-semibold"
          >
            Flagship Engineering &amp; Architecture
          </h2>
        </div>

        {/* 2x2 Clickable KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer p-5 sm:p-6 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/70 dark:bg-[#121215]/80 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/60 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_0_25px_rgba(16,185,129,0.14)] flex flex-col justify-between overflow-hidden"
              role="button"
              tabIndex={0}
              aria-label={`View deep-dive details for ${project.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
            >
              {/* Subtle ambient corner glow on hover */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

              <div className="relative space-y-4">
                {/* Top domain pill & live indicator */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono tracking-wide text-zinc-500 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {project.domain}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 group-hover:text-emerald-500 transition-colors">
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

                {/* Primary KPI Metric Callout */}
                <div className="space-y-0.5 pt-1">
                  <div className="text-3xl sm:text-4xl font-semibold font-mono tracking-tight text-zinc-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {project.kpiMetric}
                  </div>
                  <div className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400">
                    {project.kpiLabel}
                  </div>
                </div>

                {/* Project Title & Tagline */}
                <div className="space-y-1 pt-1">
                  <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {project.shortTitle}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    {project.tagline}
                  </p>
                </div>
              </div>

              {/* Hover-revealed details preview teaser */}
              <div className="relative mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                {/* Default subtle hint */}
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 dark:text-zinc-500 group-hover:hidden transition-all">
                  <span>Click for system architecture</span>
                  <span>↗</span>
                </div>

                {/* Architecture pills shown on hover without cluttering resting state */}
                <div className="hidden group-hover:flex flex-wrap gap-1.5 transition-all">
                  {project.architecture.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.architecture.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-zinc-400">
                      +{project.architecture.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Deep-Dive Interactive Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 backdrop-blur-md">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                      {selectedProject.domain}
                    </span>
                    <h3
                      id="modal-project-title"
                      className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
                    >
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400">
                      {selectedProject.tagline}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedProject(null)}
                    type="button"
                    className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    aria-label="Close details"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Highlight KPI Banner inside Modal */}
                <div className="mt-4 p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <div className="text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-300">
                        Primary Impact Metric
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                        {selectedProject.kpiLabel}
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {selectedProject.kpiMetric}
                  </div>
                </div>
              </div>

              {/* Modal Content Scrollable Area */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
                {/* Problem & Solution Narrative */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
                    System Design &amp; Architecture Overview
                  </h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Key Metrics & Impact */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
                    Key Metrics &amp; Operational Highlights
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Architecture Stack */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-zinc-400" />
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
                      Technologies &amp; Architecture Modules
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.architecture.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer with Action Buttons */}
              <div className="p-4 sm:p-5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
                  Press ESC to close
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white transition-colors"
                    >
                      <span>Live Deployment</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500 transition-colors"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
