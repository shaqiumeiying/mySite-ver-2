"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

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

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  videoUrl?: string;
  demoUrl?: string;
  date: string;
  type: string;
  linkType: "internal" | "external" | "none";
  externalUrl?: string;
};

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
          <img
            src={project.imageUrl ?? ""}
            alt={project.title}
            className="h-full w-full object-cover opacity-80"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
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
          <aside className="space-y-8">
            <div>
              <h3 className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                Role
              </h3>
              <p className="text-sm text-zinc-200">
                XR Developer &amp; Level Designer / Programmer
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                Timeline
              </h3>
              <p className="text-sm text-zinc-200">13 weeks · Spring 2026</p>
            </div>
            <div>
              <h3 className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Unity 2022", "C#", "XR Toolkit", "Blender", "Figma"].map(
                  (tool) => (
                    <span
                      key={tool}
                      className="rounded border border-zinc-700 px-2 py-0.5 text-xs text-zinc-400"
                    >
                      {tool}
                    </span>
                  )
                )}
              </div>
            </div>
          </aside>

          {/* Right Column - Case Study */}
          <article className="prose prose-invert prose-zinc max-w-none">
            <p className="text-lg leading-relaxed text-zinc-300">
              {project.description}
            </p>
            <h2 className="mt-12 text-2xl font-semibold text-white">
              Introduction
            </h2>
            <p className="text-zinc-400">
            Developed in collaboration with the <b>Centre for Digital Media</b> and <b>Tandem Impact Collective</b>, BraveVR 
            is a narrative-driven experience designed to reduce medical anxiety 
            for pediatric patients. It transforms high-stress clinical procedures 
            into a calming "brave space" through interactive storytelling.
            </p>
                
            <h2 className="mt-12 text-2xl font-semibold text-white">
              The Challenge
            </h2>
            <p className="text-zinc-400">
            Designing for clinical settings requires solving for <b>restricted mobility</b> 
            (due to medical equipment) and <b>high cognitive load</b>. 
            The interface needed to be friction-less and accessible to children 
            in physically constrained or stressful environments.
            </p>
            <h2 className="mt-12 text-2xl font-semibold text-white">
              Technical Approach
            </h2>
            <p className="text-zinc-400">
            I built a hands-free interaction framework in Unity to bypass 
            physical limitations:
            </p>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <span className="text-[#7affe7]">Multimodal Input</span>{" "}
                — Utilized <b>head-gaze</b> tracking, <b>IMU-based gestures</b> 
                and <b>breath-based inputs</b> for navigation without hand controllers.
              </li>
              <li>
                <span className="text-[#7affe7]">Interactive Environment</span>{" "}
                — Integrated <b>head-gaze</b> and <b>breath-based inputs</b> to 
                power environmental effects, subtly guiding patients toward 
                calming breathing exercises.
              </li>
              <li>
                <span className="text-[#7affe7]">Optimization</span> —
                Prioritized <b>high-performance rendering</b> to ensure a stable, 
                nausea-free experience for vulnerable users.
              </li>
            </ul>

            <h2 className="mt-12 text-2xl font-semibold text-white">
              Design Decisions
            </h2>
            <p className="text-zinc-400">
            To facilitate a seamless experience in clinical settings, 
            the design leverages <b>cognitive behavior therapy</b> through low-stress 
            environmental puzzles that are strategically timed to coincide 
            with procedural milestones, effectively shifting the child’s 
            focus from the medical task to the narrative. This is 
            complemented by <b>modular pacing</b>, featuring an adaptive story 
            flow that allows healthcare providers to easily synchronize 
            the VR experience with the specific duration of each procedure.
            </p>  
            <p className="text-zinc-400">
            The <b>spatial audio design</b> also played an equally critical role.
            We worked closely with our sound designer to create a 3D audio
            landscape where every interaction had sonic feedback. Objects
            hummed gently when hovered, clicked satisfyingly when grabbed,
            and whooshed through space when thrown.
            </p>
          </article>
        </motion.div>
      </div>
    </motion.div>
  );
}
