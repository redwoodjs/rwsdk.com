"use client";

import { useEffect, useRef, useState } from "react";
import { setTheme } from "../actions/setTheme";

type Theme = "dark" | "light" | "system";

export function ThemeToggle({ initialTheme }: { initialTheme: Theme }) {
    const [theme, setThemeState] = useState<Theme>(initialTheme);
    const isInitialMount = useRef(true);

    // Update DOM when theme changes
    useEffect(() => {
        const root = document.documentElement;
        const shouldBeDark =
            theme === "dark" ||
            (theme === "system" &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);

        if (shouldBeDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        // Set data attribute for consistency
        root.setAttribute("data-theme", theme);

        // Persist to cookie via server action (only when theme actually changes, not on initial mount)
        if (!isInitialMount.current) {
            setTheme(theme).catch((error) => {
                console.error("Failed to set theme:", error);
            });
        } else {
            isInitialMount.current = false;
        }
    }, [theme]);

    // Listen for system theme changes when theme is "system"
    useEffect(() => {
        if (theme !== "system") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            const root = document.documentElement;
            if (mediaQuery.matches) {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    const toggleTheme = () => {
        // Cycle through: system -> light -> dark -> system
        if (theme === "system") {
            setThemeState("light");
        } else if (theme === "light") {
            setThemeState("dark");
        } else {
            setThemeState("system");
        }
    };

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={toggleTheme}
                className="transition-colors text-zinc-500 dark:text-dark-secondary hover:text-orange-medium flex items-center justify-center p-2 rounded-md"
                aria-label="Toggle theme"
            >
                {theme === "dark" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                ) : theme === "light" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                )}
            </button>
        </div>
    );
}
