// src/app/components/LandingFirstFold.tsx
"use client";

import { TextShimmer } from "@/components/ui/text-shimmer";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function LandingFirstFold() {
  const scrollToDemo = () =>
    document
      .getElementById("scroll-demo")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-[100dvh] grid place-items-center bg-white dark:bg-black">
      <div className="text-center space-y-6">
        {/* 너가 주신 두 가지 예시 그대로 */}
        <TextShimmer
          className="font-mono text-2xl 
        [--base-color:theme(colors.blue.600)]
        [--base-gradient-color:theme(colors.blue.200)]
        dark:[--base-color:theme(colors.blue.700)]
        dark:[--base-gradient-color:theme(colors.blue.400)]
        "
          duration={1}
        >
          Visualizing code...
        </TextShimmer>
      </div>

      {/* 스크롤 힌트 (말풍선) */}
      <button
        onClick={scrollToDemo}
        className="group absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="relative"
        >
          <div className="relative mx-auto rounded-full bg-black/85 text-white px-4 py-2 text-sm shadow-lg">
            scroll down
            <span
              className="absolute left-1/2 -bottom-1.5 h-3 w-3 -translate-x-1/2 rotate-45 bg-black/85"
              aria-hidden
            />
          </div>
          <ChevronDown className="mx-auto mt-2 h-5 w-5 text-black/70 dark:text-white/70 transition group-hover:translate-y-1" />
        </motion.div>
      </button>
    </section>
  );
}
