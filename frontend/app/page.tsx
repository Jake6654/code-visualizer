import { HeroScrollDemo } from "@/components/HeroScrollDemo";
import LandingFirstFold from "@/components/LandingFirstFold";
import LandingIntro from "@/components/LandingIntro";

export default function Page() {
  return (
    <main className="min-h-[100dvh]">
      {/* 1) 1초 뒤 글래스 버튼 등장 */}
      <LandingIntro />
      <HeroScrollDemo />
    </main>
  );
}
