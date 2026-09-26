"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Download, ArrowUpRight, Sparkles, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { ThemeToggle } from "./ThemeToggle";

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
  return (
    <header className="space-y-8">
      {/* Top bar: Status Pill + Location + Theme Toggle */}
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

      {/* Hero Content: Photo + Bio + Title */}
      <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8">
        <div className="space-y-3.5 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-1.5"
          >
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack Engineer &amp; Systems Architect</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              {name}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl"
          >
            Building high-reliability backend systems, real-time IoT telemetry pipelines, and reactive web applications.
            Passionate about transforming intricate business workflows into resilient distributed architectures with clean data modeling.
          </motion.p>
        </div>

        {/* Animated Portrait Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.15,
          }}
          className="relative group shrink-0"
        >
          {/* Pulsating ambient aura */}
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-emerald-500 via-teal-400 to-indigo-500 rounded-2xl blur-md opacity-30 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-pulse" />

          {/* Image container */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-white/60 dark:border-zinc-800 bg-zinc-900 shadow-xl transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/john-portrait.jpg"
              alt="John Kamau portrait"
              fill
              priority
              sizes="(max-width: 640px) 112px, 128px"
              className="object-cover object-top filter brightness-105 group-hover:scale-110 transition-transform duration-500 ease-out"
            />
          </div>

          {/* Quick status badge on photo */}
          <span className="absolute -bottom-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-zinc-950" />
          </span>
        </motion.div>
      </div>

      {/* Action links with Spring animations and visual polish */}
      <motion.nav
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        aria-label="Social and contact links"
        className="flex flex-wrap items-center gap-2.5 pt-1"
      >
        <motion.a
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href={`https://github.com/${githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-sm transition-all"
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
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-sm transition-all"
        >
          <LinkedInIcon className="w-3.5 h-3.5" />
          <span>LinkedIn</span>
          <ArrowUpRight className="w-3 h-3 text-zinc-400" />
        </motion.a>

        <motion.a
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href={`mailto:${email}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-sm transition-all"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Email</span>
        </motion.a>

        {/* Functional Resume Button (Download & View) */}
        <motion.a
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          href="/api/resume"
          download="John_Kamau_Resume.pdf"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-lg border border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/20 dark:hover:bg-emerald-500/30 hover:border-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all"
          title="Download John Kamau's full CV / Resume (PDF)"
        >
          <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Download CV</span>
        </motion.a>
      </motion.nav>
    </header>
  );
}
