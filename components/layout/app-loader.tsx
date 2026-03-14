"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function AppLoader() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!visible) {
    return null;
  }

  return (
    <div className="app-loader" aria-live="polite">
      <div className="app-loader__spinner" />
    </div>
  );
}
