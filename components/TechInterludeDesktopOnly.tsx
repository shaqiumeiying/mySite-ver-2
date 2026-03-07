"use client";

import { useState, useEffect } from "react";
import TechInterlude from "./TechInterlude";

const DESKTOP_BREAKPOINT = 1024; // lg

export default function TechInterludeDesktopOnly() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!isDesktop) return null;
  return <TechInterlude />;
}
