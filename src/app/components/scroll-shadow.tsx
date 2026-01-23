"use client";

import { useEffect } from "react";

export function ScrollShadow() {
  useEffect(() => {
    const navbar = document.getElementById("main-navbar");
    if (!navbar) return;

    const handleScroll = () => {
      if (window.scrollY > 0) {
        navbar.classList.add("shadow-md");
        navbar.setAttribute("data-scrolled", "true");
      } else {
        navbar.classList.remove("shadow-md");
        navbar.removeAttribute("data-scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
