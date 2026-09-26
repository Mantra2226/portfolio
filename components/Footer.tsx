"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Eye, ArrowUp } from "lucide-react";
import { GitHubIcon, LinkedInIcon, NewCommaIcon } from "@/components/icons";
import { ResumeModal } from "./ResumeModal";
import { EmailContact } from "./EmailContact";
import { siteConfig } from "@/lib/site-config";

interface FooterProps {
  githubUsername?: string;
  linkedinUrl?: string;
  newcommaUrl?: string;
  email?: string;
}

export function Footer({
  githubUsername = siteConfig.githubUsername,
  linkedinUrl = siteConfig.socials.linkedin,
  newcommaUrl = siteConfig.socials.newcomma,
  email = siteConfig.email,
}: FooterProps) {
  const [timeString, setTimeString] = useState<string>("");
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Africa/Nairobi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);
        setTimeString(`${formatted} EAT (UTC+3)`);
      } catch {
        setTimeString("UTC+3");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="pt-16 pb-10 border-t border-zinc-200 dark:border-zinc-800/80 space-y-8">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Nairobi, Kenya</span>
            {timeString && (
              <>
                <span className="text-zinc-300 dark:text-zinc-700">|</span>
                <span className="text-zinc-800 dark:text-zinc-200 tabular-nums font-semibold">
                  {timeString}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <motion.a
              whileHover={{ y: -2 }}
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
              aria-label="GitHub profile"
            >
              <GitHubIcon className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href={newcommaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
              aria-label="New Comma profile"
              title="New Comma profile"
            >
              <NewCommaIcon className="w-4 h-4" />
            </motion.a>

            {/* Email Contact Action & Popover */}
            <EmailContact
              email={email}
              variant="icon"
              align="right"
              placement="top"
            />

            <button
              onClick={() => setIsResumeOpen(true)}
              type="button"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded-md border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
              title="Preview CV"
            >
              <Eye className="w-3 h-3" />
              <span>Preview CV</span>
            </button>

            <button
              onClick={scrollToTop}
              type="button"
              className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              aria-label="Scroll back to top"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-zinc-400 dark:text-zinc-600 pt-2 border-t border-zinc-100 dark:border-zinc-900">
          <p>© {new Date().getFullYear()} John Kamau. All rights reserved.</p>
          <p>Built with Next.js App Router, TypeScript &amp; Tailwind CSS</p>
        </div>
      </footer>

      {/* Resume Preview Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </>
  );
}
