"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[500px] pt-[1000px]">
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
        <video
          src="/viz-hero.mp4"
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          autoPlay
          loop
          muted
          playsInline
        />
      </ContainerScroll>
    </div>
  );
}
