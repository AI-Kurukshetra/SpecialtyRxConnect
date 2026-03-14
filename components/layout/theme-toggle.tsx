"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme");
    const nextTheme: Theme =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    applyTheme(root, nextTheme);
    setTheme(nextTheme);
  }, []);

  function onToggle() {
    const root = document.documentElement;
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(root, nextTheme);
    setTheme(nextTheme);
  }

  return (
    <Button
      variant="ghost"
      className="p-0 h-10 w-10"
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      onClick={onToggle}
      type="button"
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}

function MoonIcon() {
  return (
    <svg
      className="h-5 w-5 text-current"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      className="h-5 w-5 text-current"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <circle cx="12" cy="12" r="4.5" />
      <path
        d="M12 2v2m0 16v2m10-10h-2M4 12H2m16.53 5.47l-1.41-1.41M6.88 6.88 5.47 5.47m12.12 0-1.41 1.41M6.88 17.12l-1.41 1.41"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function applyTheme(root: HTMLElement, theme: Theme) {
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  localStorage.setItem("theme", theme);
}
