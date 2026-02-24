"use client";

import { useEffect } from "react";

export function ScrollMonitoring() {
  useEffect(() => {
    const navbar = document.getElementById("main-navbar");
    if (!navbar) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 0) {
            navbar.setAttribute("data-scrolled", "true");
          } else {
            navbar.removeAttribute("data-scrolled");
          }

          // Calculate progress from 0 to 1 over the first 100px of scroll
          const scrollY = window.scrollY;
          const progress = Math.min(Math.max(scrollY / 100, 0), 1);
          navbar.style.setProperty("--scroll-progress", progress.toString());
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
