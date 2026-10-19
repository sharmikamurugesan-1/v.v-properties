"use client";

import React, { useEffect } from "react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Progressive enhancement marker for CSS
    document.documentElement.classList.add("js-ready");
  }, []);

  return <>{children}</>;
}

export default MotionProvider;
