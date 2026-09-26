"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, Copy, ExternalLink, ChevronDown } from "lucide-react";

interface EmailContactProps {
  email?: string;
  variant?: "button" | "icon";
  align?: "center" | "left" | "right";
  placement?: "top" | "bottom";
  className?: string;
}

export function EmailContact({
  email = "desarixpowell@gmail.com",
  variant = "button",
  align = "center",
  placement = "bottom",
  className = "",
}: EmailContactProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleMainClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. Immediately copy to clipboard on click so the user always has the email ready
    copyToClipboard();

    // 2. Toggle the options popover
    setIsOpen((prev) => !prev);
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}`;
  const outlookComposeUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
    email
  )}`;

  // Alignment classes for popover positioning
  const alignClass =
    align === "right"
      ? "right-0"
      : align === "left"
      ? "left-0"
      : "left-1/2 -translate-x-1/2";

  const placementClass =
    placement === "top" ? "bottom-full mb-2.5" : "top-full mt-2.5";

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      {variant === "button" ? (
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleMainClick}
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={`Contact email ${email}`}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
            copied
              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              : "border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-xs"
          }`}
          title="Click to copy email or open mail options"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500 animate-in zoom-in" />
          ) : (
            <Mail className="w-3.5 h-3.5" />
          )}
          <span>{copied ? "Copied!" : "Email"}</span>
          <ChevronDown
            className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMainClick}
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label="Send email or copy address"
          title={`Email: ${email} (Click to open options)`}
          className={`p-2 rounded-md transition-colors cursor-pointer ${
            copied
              ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
              : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100"
          }`}
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-500 animate-in zoom-in" />
          ) : (
            <Mail className="w-4 h-4" />
          )}
        </motion.button>
      )}

      {/* Interactive Options Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: placement === "top" ? 8 : -8,
              scale: 0.95,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: placement === "top" ? 8 : -8,
              scale: 0.95,
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="dialog"
            aria-label="Email options"
            className={`absolute ${placementClass} ${alignClass} z-50 w-72 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-xl shadow-zinc-950/10 dark:shadow-zinc-950/40 text-left`}
          >
            {/* Header: Email Address Pill with Copy Confirmation */}
            <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-zinc-100/90 dark:bg-zinc-800/70 border border-zinc-200/50 dark:border-zinc-700/50 mb-2">
              <span className="font-mono text-[11px] text-zinc-700 dark:text-zinc-300 truncate select-all">
                {email}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard();
                }}
                className="shrink-0 p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                title="Copy email address"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>

            {/* Quick Copied Banner */}
            {copied && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 px-1 pb-2 flex items-center gap-1.5"
              >
                <Check className="w-3 h-3" />
                <span>Address copied to clipboard!</span>
              </motion.div>
            )}

            {/* Action Links */}
            <div className="space-y-1">
              {/* 1. Open in Gmail */}
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between w-full px-2.5 py-2 text-xs font-mono rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-red-500" />
                  <span>Open in Gmail (Web)</span>
                </div>
                <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200" />
              </a>

              {/* 2. Open in Outlook Web */}
              <a
                href={outlookComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between w-full px-2.5 py-2 text-xs font-mono rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-blue-500" />
                  <span>Open in Outlook Web</span>
                </div>
                <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200" />
              </a>

              {/* 3. Open Default Mail App (mailto:) */}
              <a
                href={`mailto:${email}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between w-full px-2.5 py-2 text-xs font-mono rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200" />
                  <span>Default Mail App</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">mailto</span>
              </a>

              {/* 4. Copy email address button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard();
                }}
                className="flex items-center justify-between w-full px-2.5 py-2 text-xs font-mono rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Copy className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{copied ? "Copied to clipboard" : "Copy email address"}</span>
                </div>
                {copied && <Check className="w-3 h-3 text-emerald-500" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
