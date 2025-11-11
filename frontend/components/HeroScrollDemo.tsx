// src/app/components/HeroScrollDemoCompact.tsx
"use client";

import React from "react";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <section id="scroll-demo" className="bg-white dark:bg-black">
      <div className="flex flex-col overflow-hidden pt-[15vh] pb-[10vh]">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Visualize your code step by step <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Code&nbsp;Visualizer
                </span>
              </h1>
            </>
          }
        >
          {/* 이미지 or 비디오로 교체 가능 */}
          <Image
            src="/viz-hero.png"
            alt="Code visualization demo"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
            priority
          />
          {/*
          <video
            src="/viz-hero.mp4"
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            autoPlay
            muted
            loop
            playsInline
          />
          */}
        </ContainerScroll>
      </div>
    </section>
  );
}
