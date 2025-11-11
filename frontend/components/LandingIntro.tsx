// src/app/components/LandingIntro.tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Zap } from "lucide-react";
import { GlassButton } from "./ui/glass-button";
import LandingFirstFold from "./LandingFirstFold";

export default function LandingIntro() {
  const [showButton, setShowButton] = useState(false);
  const [mode, setMode] = useState<"button" | "first">("button");

  useEffect(() => {
    const t = setTimeout(() => setShowButton(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const goFirst = () => {
    setMode("first"); // ✅ 스크롤 없이 같은 자리에서 컴포넌트 전환
  };

  return (
    <section
      className="relative min-h-[100dvh] grid place-items-center
      bg-[radial-gradient(60%_60%_at_50%_120%,#c7d2fe_0%,transparent_70%)]"
    >
      <AnimatePresence mode="wait">
        {mode === "button" && showButton && (
          <motion.div
            key="glass"
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <GlassButton
              size="lg"
              contentClassName="flex items-center gap-2"
              onClick={goFirst}
              aria-label="Generate"
            >
              <span>Generate</span>
              <Zap className="h-5 w-5" />
            </GlassButton>
          </motion.div>
        )}

        {mode === "first" && (
          <motion.div
            key="first"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full"
          >
            <LandingFirstFold />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
