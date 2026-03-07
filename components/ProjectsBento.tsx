"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const MOBILE_BREAKPOINT = 768;

function usePrefersVideo() {
  const [prefersVideo, setPrefersVideo] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setPrefersVideo(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return prefersVideo;
}

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  videoUrl?: string;
  demoUrl: string;
  date: string;
  type: string;
  linkType: "internal" | "external" | "none";
  externalUrl?: string;
};

/** First card: larger and wider (hero). Rest: smaller. */
const isFirstCard = (i: number) => i === 0;

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

type ProjectsBentoProps = {
  projects: Project[];
};

type CardWrapperProps = {
  project: Project;
  children: ReactNode;
  isClickable: boolean;
};

function CardWrapper({ project, children, isClickable }: CardWrapperProps) {
  const baseClasses =
    "group relative block h-full overflow-hidden rounded-2xl border border-white/10 transition-all duration-300";
  const hoverClasses = isClickable
    ? "hover:border-[#7affe7]/30 hover:shadow-[0_0_30px_rgba(122,255,231,0.08)] cursor-pointer"
    : "cursor-default";

  if (project.linkType === "internal") {
    return (
      <Link href={`/projects/${project.id}`} className={`${baseClasses} ${hoverClasses}`}>
        {children}
      </Link>
    );
  }

  if (project.linkType === "external") {
    return <div className={`${baseClasses} ${hoverClasses}`}>{children}</div>;
  }

  return <div className={`${baseClasses} ${hoverClasses}`}>{children}</div>;
}

export default function ProjectsBento({ projects }: ProjectsBentoProps) {
  const prefersVideo = usePrefersVideo();

  return (
    <section id="projects" className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-lg font-medium tracking-tight text-zinc-50 sm:text-xl">
            Featured Projects
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            A snapshot of work across interactive experiences,
            games, and art concepts.
          </p>
        </div>
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
          {projects.length.toString().padStart(2, "0")} Projects
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {projects.map((project, index) => {
          const isClickable = project.linkType !== "none";
          const isFirst = isFirstCard(index);
          const gridClass = isFirst ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1";
          const minH = isFirst ? "min-h-[520px]" : "min-h-[340px]";
          const mediaH = isFirst ? "h-[72%]" : "h-[68%]";

          return (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className={gridClass}
              whileHover={isClickable ? { y: -5, scale: 1.02 } : undefined}
              transition={{ duration: 0.3 }}
            >
              <CardWrapper project={project} isClickable={isClickable}>
                <div className={`flex h-full flex-col ${minH}`}>
                  {/* Media Section (Top 65-75%) */}
                  <div className={`relative overflow-hidden ${mediaH}`}>
                    {project.videoUrl && (prefersVideo || isFirst) ? (
                      <>
                        <video
                          src={project.videoUrl}
                          poster={project.imageUrl || undefined}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className={`h-full w-full object-cover transition-transform duration-700 ease-in-out ${isClickable ? "group-hover:scale-105" : ""}`}
                        />
                        <div
                          className={`absolute inset-0 bg-black/40 transition-colors duration-500 ${isClickable ? "group-hover:bg-transparent" : ""}`}
                        />
                      </>
                    ) : project.imageUrl ? (
                      <>
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          loading={isFirst ? "eager" : "lazy"}
                          decoding="async"
                          className={`h-full w-full object-cover transition-transform duration-700 ease-in-out ${isClickable ? "group-hover:scale-105" : ""}`}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div
                          className={`absolute inset-0 bg-black/40 transition-colors duration-500 ${isClickable ? "group-hover:bg-transparent" : ""}`}
                        />
                      </>
                    ) : project.videoUrl && !prefersVideo && !isFirst && project.imageUrl ? (
                      <>
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          loading={isFirst ? "eager" : "lazy"}
                          decoding="async"
                          className={`h-full w-full object-cover transition-transform duration-700 ease-in-out ${isClickable ? "group-hover:scale-105" : ""}`}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40" />
                      </>
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
                    )}

                    {/* Date/Type badge overlay */}
                    <div className="absolute left-4 top-4 flex gap-2">
                      <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-widest text-zinc-300 backdrop-blur-sm">
                        {project.date}
                      </span>
                      <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-widest text-zinc-300 backdrop-blur-sm">
                        {project.type}
                      </span>
                    </div>

                    {/* Demo link (top right) - external only */}
                    {project.linkType === "external" && project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-zinc-400 backdrop-blur-sm transition-colors duration-300 hover:bg-[#ffc7d7]/20 hover:text-[#ffc7d7]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  {/* Content Section (Bottom 25-35%) */}
                  <div className="flex flex-1 flex-col justify-between bg-zinc-950/80 px-5 py-4">
                    <div>
                      <h3 className="mb-1 text-lg font-bold text-white transition-colors duration-300 group-hover:text-zinc-50">
                        {project.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-zinc-400 line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[#7affe7]/20 bg-[#7affe7]/5 px-2.5 py-0.5 text-[9px] uppercase tracking-wide text-[#7affe7]/80 transition-colors duration-300 group-hover:border-[#7affe7]/40 group-hover:text-[#7affe7]"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="text-[9px] text-zinc-500">
                            +{project.tags.length - 4}
                          </span>
                        )}

                        {/* Hover CTA */}
                        {project.linkType === "internal" && (
                          <span className="ml-auto flex items-center gap-1 text-xs text-zinc-500 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#7affe7] group-hover:opacity-100">
                            Case Study
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        )}
                        {project.linkType === "external" && project.externalUrl && (
                          <a
                            href={project.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto flex items-center gap-1 text-xs text-zinc-500 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#ffc7d7] group-hover:opacity-100"
                          >
                            Visit
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardWrapper>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
