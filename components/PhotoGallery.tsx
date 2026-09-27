"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Camera, X, ZoomIn } from "lucide-react";

interface PhotoItem {
  src: string;
  alt: string;
  title: string;
  tag: string;
}

const PHOTOS: PhotoItem[] = [
  {
    src: "/images/john-portrait.jpg",
    alt: "John Kamau — Software Engineer & Architect",
    title: "Engineering & System Architecture",
    tag: "Studio",
  },
  {
    src: "/images/john-couch.jpg",
    alt: "John Kamau ideating and designing systems",
    title: "Ideation & Collaborative Building",
    tag: "Creative",
  },
  {
    src: "/images/john-sky.jpg",
    alt: "John Kamau outdoors",
    title: "Perspective & Continuous Learning",
    tag: "Outdoor",
  },
];

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  return (
    <section aria-labelledby="gallery-heading" className="space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-emerald-500" />
          <h2
            id="gallery-heading"
            className="text-sm font-mono uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-semibold"
          >
            Beyond The Terminal
          </h2>
        </div>
        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
          Personal snapshots
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {PHOTOS.map((photo, index) => (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative cursor-pointer rounded-xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-sm hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 aspect-[3/4] sm:aspect-[3/4]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover object-center filter group-hover:scale-105 transition-transform duration-500 ease-out"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

            {/* Floating Tag */}
            <div className="absolute top-3 left-3">
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                {photo.tag}
              </span>
            </div>

            {/* Zoom icon hint */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white">
                <ZoomIn className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
              <p className="text-xs font-medium tracking-tight truncate">
                {photo.title}
              </p>
              <p className="text-[10px] font-mono text-zinc-300">
                Click to inspect
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full max-h-[85vh] rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-700 bg-zinc-950 shadow-2xl"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white hover:text-emerald-400 transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative w-full h-[60vh]">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain p-2"
                  sizes="100vw"
                  priority
                />
              </div>

              <div className="p-4 bg-zinc-900/90 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    John Kamau • Nairobi, Kenya
                  </p>
                </div>
                <span className="px-2.5 py-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-md">
                  {selectedPhoto.tag}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
