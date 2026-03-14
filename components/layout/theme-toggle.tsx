"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);
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
    setIsMounted(true);
  }, []);

  function onToggle() {
    const root = document.documentElement;
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(root, nextTheme);
    setTheme(nextTheme);
  }

  return (
    <Button
      aria-label="Toggle theme"
      onClick={onToggle}
      type="button"
      variant="secondary"
    >
      {isMounted && theme === "dark" ? "Light Theme" : "Dark Theme"}
    </Button>
  );
}

function applyTheme(root: HTMLElement, theme: Theme) {
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  localStorage.setItem("theme", theme);
}
