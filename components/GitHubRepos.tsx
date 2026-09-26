"use client";

import { motion } from "framer-motion";
import { Star, GitFork, ArrowUpRight, BookMarked, Code2 } from "lucide-react";
import { GitHubRepo } from "@/lib/github";

interface GitHubReposProps {
  repos: GitHubRepo[];
  username?: string;
}

export function GitHubRepos({
  repos,
  username = "Mantra2226",
}: GitHubReposProps) {
  return (
    <section aria-labelledby="github-repos-heading" className="space-y-6">
      <div className="flex items-baseline justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2">
          <BookMarked className="w-4 h-4 text-emerald-500" />
          <h2
            id="github-repos-heading"
            className="text-sm font-mono uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-semibold"
          >
            Live GitHub Repositories
          </h2>
        </div>
        <a
          href={`https://github.com/${username}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors"
        >
          <span>View all on GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo, idx) => (
          <motion.a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="group flex flex-col justify-between p-5 rounded-xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/70 dark:bg-[#121215]/80 backdrop-blur-md hover:border-emerald-500/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_20px_rgba(16,185,129,0.08)] transition-all duration-300"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Code2 className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-colors shrink-0" />
                  <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                    {repo.name}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {repo.description || "Public repository and system architecture modules."}
              </p>
            </div>

            {/* Metrics and language footer */}
            <div className="flex items-center justify-between pt-4 mt-3 border-t border-zinc-100 dark:border-zinc-800/60 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                {repo.primaryLanguage && (
                  <>
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                      style={{
                        backgroundColor: repo.primaryLanguage.color || "#10b981",
                      }}
                    />
                    <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                      {repo.primaryLanguage.name}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="inline-flex items-center gap-1 text-[11px] hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                  title={`${repo.stargazerCount} stars`}
                >
                  <Star className="w-3.5 h-3.5 text-amber-500/80 fill-amber-500/20" />
                  <span>{repo.stargazerCount}</span>
                </span>
                <span
                  className="inline-flex items-center gap-1 text-[11px] hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                  title={`${repo.forkCount} forks`}
                >
                  <GitFork className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{repo.forkCount}</span>
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
