"use client";

import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { motion, useInView } from "framer-motion";

export type ArchiveEntry = {
  year: string;
  title: string;
  builtWith: string[];
  link: string;
};

type ProjectArchiveProps = {
  archive: ArchiveEntry[];
};

export default function ProjectArchive({ archive }: ProjectArchiveProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });

  return (
    <section ref={sectionRef} id="archive" className="relative space-y-6">
      {/* Decorative images - only visible when archive section is in view */}
      <motion.div
        className="pointer-events-none fixed inset-x-0 bottom-0 left-0 right-0 z-0 hidden w-full md:block"
        initial={false}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.img
          src="/images/deco-left.png"
          alt=""
          aria-hidden
          className="absolute bottom-0 left-0 h-[clamp(20vh,65vh,75vh)] w-auto object-contain object-left-bottom opacity-40"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 0.4, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <motion.img
          src="/images/deco-right.png"
          alt=""
          aria-hidden
          className="absolute bottom-0 right-0 h-[clamp(20vh,65vh,75vh)] w-auto object-contain object-right-bottom opacity-40"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 0.4, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </motion.div>

      <div className="relative z-10">
        <h2 className="text-lg font-medium tracking-tight text-zinc-50 sm:text-xl">
          Full Project Archive
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          A complete list of things I&apos;ve built, experimented with, or
          designed.
        </p>
      </div>

      <div className="relative z-10 overflow-hidden rounded-xl border border-white/10">
        {archive.map((entry, index) => (
          <motion.a
            key={entry.link}
            href={entry.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 border-b border-l-2 border-white/10 border-l-transparent px-4 py-4 transition-all duration-300 last:border-b-0 hover:border-l-[#ffc7d7]/60 hover:bg-white/5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.06 }}
          >
            <span className="shrink-0 font-mono text-sm text-gray-500">
              {entry.year}
            </span>
            <span className="min-w-0 flex-1 text-base font-semibold text-gray-200 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#ffc7d7]">
              {entry.title}
            </span>
            <div className="hidden flex items-center gap-2 text-xs text-gray-500 sm:flex">
              {entry.builtWith.map((tech, i) => (
                <span key={tech}>
                  {tech}
                  {i < entry.builtWith.length - 1 && (
                    <span className="mx-1 text-gray-600">·</span>
                  )}
                </span>
              ))}
            </div>
            <ExternalLink className="h-4 w-4 shrink-0 text-gray-500 transition-colors group-hover:text-gray-300" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
