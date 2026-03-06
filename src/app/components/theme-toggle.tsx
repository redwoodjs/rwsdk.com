"use client";

import { useEffect, useRef, useState } from "react";
import { setTheme } from "../actions/setTheme";

type Theme = "dark" | "light";

export function ThemeToggle({ initialTheme }: { initialTheme: Theme | "system" }) {
    // Resolve "system" to the actual preference immediately
    const [theme, setThemeState] = useState<Theme>(() => {
        if (initialTheme === "system") {
            // On the server we can't check matchMedia, default to "light"
            // Will be corrected on client mount below
            return "light";
        }
        return initialTheme;
    });
    const isInitialMount = useRef(true);

    // On mount, resolve "system" to actual preference
    useEffect(() => {
        if (initialTheme === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setThemeState(prefersDark ? "dark" : "light");
        }
    }, []);

    // Update DOM when theme changes
    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        root.setAttribute("data-theme", theme);

        // Persist to cookie via server action (skip initial mount)
        if (!isInitialMount.current) {
            setTheme(theme).catch((error) => {
                console.error("Failed to set theme:", error);
            });
        } else {
            isInitialMount.current = false;
        }
    }, [theme]);

    const toggleTheme = () => {
        setThemeState(theme === "dark" ? "light" : "dark");
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
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                )}
            </button>
        </div>
    );
}

