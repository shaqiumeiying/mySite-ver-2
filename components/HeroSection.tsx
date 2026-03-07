"use client";

import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const LOOP_PHOTOS = [
  { src: "/images/FlappyD thumbnail.png", alt: "VR Simulation for UBC Medicine" },
  { src: "/images/hero_oc1.png", alt: "Kourage VR Healthcare Experience" },
  { src: "/images/myoc.png", alt: "Mushroom Picking Game Design" },
];

const CYCLE_INTERVAL = 3000;

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % LOOP_PHOTOS.length);
    }, CYCLE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const getStackPosition = (index: number) => {
    const diff = (index - activeIndex + LOOP_PHOTOS.length) % LOOP_PHOTOS.length;
    return diff;
  };

  return (
    <motion.section
      id="about"
      className="grid gap-8 sm:gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="space-y-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500 sm:text-xs sm:tracking-[0.25em]">
          Unity · VR · Interaction
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl md:text-4xl">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-[#7affe7] to-[#ffc7d7] bg-clip-text text-transparent">
            Diana
          </span>
          . 
        </h1>
        <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
            Building at the intersection of {" "}
          <span className="text-zinc-100">
          software development, spatial design, and digital art 
          </span>
          . I code the mechanics, but I paint the light.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://github.com/shaqiumeiying"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors duration-300 hover:border-[#7affe7]/40 hover:bg-zinc-900"
          >
            <Github className="h-4 w-4 transition-colors duration-300 group-hover:text-[#7affe7]" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/xinyi-dou/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors duration-300 hover:border-[#7affe7]/40 hover:bg-zinc-900"
          >
            <Linkedin className="h-4 w-4 transition-colors duration-300 group-hover:text-[#7affe7]" />
            LinkedIn
          </a>
          <a
            href="mailto:douxinyi0142@gmail.com"
            className="group inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors duration-300 hover:border-[#7affe7]/40 hover:bg-zinc-900"
          >
            <Mail className="h-4 w-4 transition-colors duration-300 group-hover:text-[#7affe7]" />
            Email
          </a>
          <a
            href="/docs/Xinyi_Dou_CV_Technical_Artist.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors duration-300 hover:border-[#7affe7]/40 hover:bg-zinc-900"
          >
            <FileText className="h-4 w-4 transition-colors duration-300 group-hover:text-[#7affe7]" />
            Resume
          </a>
        </div>
      </motion.div>

      <motion.div
        className="flex justify-center md:justify-end"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <div className="relative h-48 w-full max-w-[260px] sm:h-56 sm:max-w-xs md:h-64">
          <AnimatePresence>
            {LOOP_PHOTOS.map((photo, index) => {
              const stackPos = getStackPosition(index);
              const isActive = stackPos === 0;
              const scale = 1 - stackPos * 0.06;
              const yOffset = stackPos * -8;
              const opacity = 1 - stackPos * 0.2;
              const zIndex = LOOP_PHOTOS.length - stackPos;

              return (
                <motion.div
                  key={photo.src}
                  className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(122,255,231,0.08),0_0_40px_rgba(255,199,215,0.04)]"
                  style={{ zIndex }}
                  initial={false}
                  animate={{
                    scale,
                    y: yOffset,
                    opacity,
                    rotateZ: stackPos * 0.8,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                    mass: 0.8,
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  {isActive && (
                    <motion.div
                      className="absolute bottom-3 left-3 right-3"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                    >
                      <p className="font-sans text-xs font-medium uppercase tracking-wider text-zinc-300/90 sm:text-[10px]">
                        {photo.alt}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-1">
            {LOOP_PHOTOS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="touch-manipulation p-2.5 -m-1 flex items-center justify-center rounded-full transition-colors hover:bg-white/5 active:bg-white/10"
                aria-label={`Go to photo ${index + 1}`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "h-1.5 w-5 bg-gradient-to-r from-[#7affe7] to-[#ffc7d7] sm:h-1 sm:w-4"
                      : "h-1.5 w-1.5 bg-zinc-600 sm:h-1 sm:w-1"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
