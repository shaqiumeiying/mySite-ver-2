"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl: string;
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
      className="min-h-screen"
    >
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
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors duration-300 hover:text-[#ffc7d7]"
          >
            View Live
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative h-[40vh] w-full overflow-hidden sm:h-[50vh] lg:h-[60vh]">
        <div className="absolute inset-0 bg-zinc-900">
          <img
            src={project.imageUrl}
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
      <div className="relative z-10 mx-auto -mt-32 max-w-6xl px-4 sm:px-6 lg:px-8">
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
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
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
                Lead Developer &amp; Interaction Designer
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                Timeline
              </h3>
              <p className="text-sm text-zinc-200">8 weeks · Fall 2025</p>
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
            <div>
              <h3 className="mb-2 text-xs uppercase tracking-widest text-zinc-500">
                Team
              </h3>
              <p className="text-sm text-zinc-200">
                3 developers, 2 designers, 1 researcher
              </p>
            </div>
          </aside>

          {/* Right Column - Case Study */}
          <article className="prose prose-invert prose-zinc max-w-none">
            <p className="text-lg leading-relaxed text-zinc-300">
              {project.description}
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-white">
              The Challenge
            </h2>
            <p className="text-zinc-400">
              Building immersive VR experiences requires balancing technical
              constraints with emotional impact. For this project, we faced the
              challenge of creating intuitive interactions that would feel
              natural to first-time VR users while maintaining the depth needed
              to engage returning players.
            </p>
            <p className="text-zinc-400">
              The core problem centered around spatial input: how do you design
              interactions that leverage 6DOF controllers without overwhelming
              users with complex gesture systems? We needed a solution that
              would scale from simple pick-and-place mechanics to more
              sophisticated manipulation tasks.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-white">
              Technical Approach
            </h2>
            <p className="text-zinc-400">
              Our Unity architecture was built around a modular interaction
              system. We implemented a custom XR Interaction Manager that
              extended Unity&apos;s XR Toolkit, adding support for:
            </p>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <span className="text-[#7affe7]">Proximity-based feedback</span>{" "}
                — Subtle haptic pulses and visual highlights as hands approach
                interactable objects
              </li>
              <li>
                <span className="text-[#7affe7]">Contextual grab mechanics</span>{" "}
                — Objects respond differently based on approach angle and
                velocity
              </li>
              <li>
                <span className="text-[#7affe7]">Graceful degradation</span> —
                Fallback interactions for users who struggle with precise
                controller input
              </li>
            </ul>

            <h2 className="mt-12 text-2xl font-semibold text-white">
              Design Decisions
            </h2>
            <p className="text-zinc-400">
              One of the most impactful decisions was shifting from direct
              manipulation to what we called &quot;assisted agency.&quot;
              Rather than requiring pixel-perfect precision, we implemented
              smart snapping and trajectory prediction that made users feel
              skillful while secretly providing assistance.
            </p>
            <p className="text-zinc-400">
              The spatial audio design played an equally critical role.
              We worked closely with our sound designer to create a 3D audio
              landscape where every interaction had sonic feedback. Objects
              hummed gently when hovered, clicked satisfyingly when grabbed,
              and whooshed through space when thrown.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-white">
              Outcomes
            </h2>
            <p className="text-zinc-400">
              The final build was tested with 24 participants across three
              age groups. Key metrics showed a 40% reduction in failed
              interactions compared to our baseline build, and qualitative
              feedback consistently highlighted the &quot;magical&quot; feeling
              of the experience.
            </p>
            <p className="text-zinc-400">
              This project reinforced my belief that the best VR interactions
              are invisible — they should feel like extensions of natural
              movement rather than learned game mechanics.
            </p>
          </article>
        </motion.div>
      </div>
    </motion.div>
  );
}
