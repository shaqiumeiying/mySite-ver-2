"use client";

import { useEffect, useState, Fragment } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import PairedPlatformGallery from "@/components/PairedPlatformGallery";
import type { Project } from "@/data/types";

export type { Project };

const FOX_EMOJI_FILES = [
  "Fox_Blushing.png",
  "Fox_Cheer.png",
  "Fox_Cooking.png",
  "Fox_Cry.png",
  "Fox_Fighting.png",
  "Fox_Hype.png",
  "Fox_InLove.png",
  "Fox_Joy.png",
  "Fox_Like.png",
  "Fox_Love.png",
  "Fox_Money.png",
  "Fox_Question.png",
  "Fox_Rage.png",
  "Fox_Reading.png",
  "Fox_Scared.png",
  "Fox_Sick.png",
  "Fox_Sleepy.png",
  "Fox_Speechless.png",
  "Fox_Sweatdrop.png",
  "Fox_Thinking.png",
  "Fox_Wave.png",
  "Fox_Wink.png",
  "Fox_Working.png",
] as const;

const FOX_EMOJI_SRCS = FOX_EMOJI_FILES.map(
  (f) => `/images/projects/foxEmoji/${f}`
);

type FallItem = {
  id: number;
  src: string;
  leftPct: number;
  delay: number;
  duration: number;
  sizePx: number;
  rotate: number;
};

function FoxEmojiFall() {
  const [items, setItems] = useState<FallItem[] | null>(null);

  useEffect(() => {
    const count = 22;
    setItems(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        src: FOX_EMOJI_SRCS[Math.floor(Math.random() * FOX_EMOJI_SRCS.length)]!,
        leftPct: Math.random() * 94 + 3,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 14,
        sizePx: 28 + Math.floor(Math.random() * 40),
        rotate: (Math.random() - 0.5) * 40,
      }))
    );
  }, []);

  if (!items) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {items.map((item) => (
        <motion.img
          key={item.id}
          src={item.src}
          alt=""
          className="absolute top-0 h-auto -translate-x-1/2 select-none"
          style={{
            left: `${item.leftPct}%`,
            width: item.sizePx,
          }}
          initial={{ y: "-15vh", opacity: 0, rotate: item.rotate }}
          animate={{ y: "115vh", opacity: 0.65, rotate: item.rotate }}
          transition={{
            y: {
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: {
              duration: 0.8,
              delay: item.delay,
            },
            rotate: { duration: 0 },
          }}
        />
      ))}
    </div>
  );
}

/** Renders `**bold**` segments within case-study text as <strong>. */
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

type ProjectDetailContentProps = {
  project: Project;
};

export default function ProjectDetailContent({
  project,
}: ProjectDetailContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative min-h-screen"
    >
      <FoxEmojiFall />

      {/* Back Navigation */}
      <nav className="sticky top-0 z-50 border-b border-zinc-800/60 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors duration-300 hover:text-[#7affe7]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </Link>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors duration-300 hover:text-[#ffc7d7]"
            >
              View Here
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative z-10 h-[40vh] w-full overflow-hidden sm:h-[50vh] lg:h-[60vh]">
        <div className="absolute inset-0 bg-zinc-900">
          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-full w-full object-cover opacity-80"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      {/* Header Content */}
      <div className="relative z-20 mx-auto -mt-32 max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-4 flex items-center gap-4 text-xs uppercase tracking-widest text-zinc-400">
            <span>{project.date}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <span>{project.type}</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <div className="mb-12 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-[#7affe7]/30 bg-[#7affe7]/5 px-4 py-1.5 text-xs uppercase tracking-wide text-[#7affe7]"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Two-Column Body */}
      <div className="relative z-20 mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16"
        >
          {/* Left Column - Context */}
          {(project.role || project.timeline || (project.tools && project.tools.length > 0)) && (
            <aside className="space-y-8">
              {project.role && (
                <div>
                  <h3 className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                    Role
                  </h3>
                  <p className="text-sm text-zinc-200">{project.role}</p>
                </div>
              )}
              {project.timeline && (
                <div>
                  <h3 className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                    Timeline
                  </h3>
                  <p className="text-sm text-zinc-200">{project.timeline}</p>
                </div>
              )}
              {project.tools && project.tools.length > 0 && (
                <div>
                  <h3 className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                    Tools
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded border border-zinc-700 px-2 py-0.5 text-xs text-zinc-400"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          )}

          {/* Right Column - Case Study */}
          <article
            className={`prose prose-invert prose-zinc max-w-none ${
              project.role || project.timeline || project.tools ? "" : "lg:col-span-2"
            }`}
          >
            <p className="text-lg leading-relaxed text-zinc-300">
              {project.description}
            </p>

            {project.heroVideoUrl && (
              <div className="not-prose my-10 overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_0_40px_rgba(0,0,0,0.45)]">
                <video
                  src={project.heroVideoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="aspect-video w-full bg-black object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {project.pairedGallery && project.pairedGallery.length > 0 && (
              <div className="not-prose my-10">
                <h2 className="mb-4 text-2xl font-semibold text-white">
                  VR × Mobile Walkthrough
                </h2>
                <PairedPlatformGallery pages={project.pairedGallery} />
              </div>
            )}

            {project.gallery && project.gallery.length > 0 && (
              <div className="not-prose my-10">
                <h2 className="mb-4 text-2xl font-semibold text-white">
                  Demos
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.gallery.map((item, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_0_30px_rgba(0,0,0,0.4)]"
                    >
                      {item.type === "video" ? (
                        <video
                          src={item.src}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="aspect-video w-full bg-black object-cover"
                        />
                      ) : (
                        <img
                          src={item.src}
                          alt={item.caption ?? project.title}
                          loading="lazy"
                          className="aspect-video w-full bg-black object-cover"
                        />
                      )}
                      {item.caption && (
                        <p className="px-3 py-2 text-xs text-zinc-500">
                          {item.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.caseStudy?.map((section) => (
              <div key={section.heading}>
                <h2 className="mt-12 text-2xl font-semibold text-white">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((paragraph, i) => (
                  <p key={i} className="text-zinc-400">
                    {renderInline(paragraph)}
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-2 text-zinc-400">
                    {section.bullets.map((bullet, i) => (
                      <li key={i}>
                        {bullet.label && (
                          <>
                            <span className="text-[#7affe7]">
                              {bullet.label}
                            </span>{" "}
                            —{" "}
                          </>
                        )}
                        {renderInline(bullet.text)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>
        </motion.div>
      </div>
    </motion.div>
  );
}
