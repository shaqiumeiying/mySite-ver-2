"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/70 backdrop-blur-md">
      <motion.nav
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="text-sm font-semibold tracking-[0.3em] uppercase text-zinc-200">
          Xinyi Dou
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-zinc-400 sm:gap-6">
          <a
            href="#about"
            className="transition-colors duration-300 hover:text-[#7affe7]"
          >
            About
          </a>
          <a
            href="#projects"
            className="transition-colors duration-300 hover:text-[#ffc7d7]"
          >
            Projects
          </a>
          <a
            href="#3d-showcase"
            className="transition-colors duration-300 hover:text-[#7affe7]"
          >
            3D Showcase
          </a>
        </div>
      </motion.nav>
    </header>
  );
}
