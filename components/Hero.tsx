"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, ArrowUpRight, Sparkles, MapPin, Eye } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { ThemeToggle } from "./ThemeToggle";
import { ResumeModal } from "./ResumeModal";

interface HeroProps {
  name?: string;
  githubUsername?: string;
  linkedinUrl?: string;
  email?: string;
}

export function Hero({
  name = "JOHN KAMAU",
  githubUsername = "Mantra2226",
  linkedinUrl = "https://www.linkedin.com/in/john-powell-39b295379",
  email = "desarixpowell@gmail.com",
}: HeroProps) {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      <header className="space-y-8 text-center">
        {/* Top utility bar */}
        <div className="flex items-center justify-between gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-medium tracking-tight">Available for new projects</span>
          </motion.div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>Nairobi, KE</span>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Centered Large Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 20,
            delay: 0.1,
          }}
          className="relative inline-block mx-auto group pt-2"
        >
          {/* Animated gradient ambient halo */}
          <div className="absolute -inset-2.5 bg-gradient-to-tr from-emerald-500 via-teal-400 to-indigo-500 rounded-3xl blur-xl opacity-35 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-pulse" />

          {/* Large portrait container */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-3xl overflow-hidden border-2 border-white/80 dark:border-zinc-800 bg-zinc-900 shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]">
            <Image
              src="/images/john-portrait.jpg"
              alt="John Kamau portrait"
              fill
              priority
              sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, 224px"
              className="object-cover object-[center_28%] filter brightness-105 group-hover:scale-108 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Status pill badge on avatar */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 shadow-md flex items-center gap-1.5 whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono font-medium text-zinc-700 dark:text-zinc-300">
              Online
            </span>
          </div>
        </motion.div>

        {/* Centered Name & Title */}
        <div className="space-y-3 max-w-2xl mx-auto pt-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="space-y-2"
          >
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack Engineer &amp; Systems Architect</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              {name}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mx-auto max-w-xl"
          >
            Building high-reliability backend systems, real-time IoT telemetry pipelines, and reactive web applications.
            Passionate about transforming intricate business workflows into resilient distributed architectures with clean data modeling.
          </motion.p>
        </div>

        {/* Centered Action Links */}
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          aria-label="Social and contact links"
          className="flex flex-wrap items-center justify-center gap-2.5 pt-2"
        >
          <motion.a
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-xs transition-all"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-400" />
          </motion.a>

          <motion.a
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-xs transition-all"
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-400" />
          </motion.a>

          <motion.a
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={`mailto:${email}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-xs transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </motion.a>

          {/* Interactive Resume Preview Button */}
          <motion.button
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsResumeOpen(true)}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-lg border border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/20 dark:hover:bg-emerald-500/30 hover:border-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all cursor-pointer"
            title="Preview John Kamau's full CV / Resume"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Preview CV</span>
          </motion.button>
        </motion.nav>
      </header>

      {/* In-Browser PDF Resume Preview Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </>
  );
}
