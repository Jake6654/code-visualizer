"use client";
import { useMemo, useState } from "react";

/**
 * 기본 샘플 코드 (화면에 미리 표시됨)
 */
const SAMPLE = `
def add(a,b):
    s = a + b
    return s

def main():
    total = 0
    for i in range(3):
        total = add(total, i)
    return total
`;

export default function Home() {
  // 입력된 코드 상태
  const [code, setCode] = useState(SAMPLE.trim());
  // 실행할 entry 함수명
  const [entry, setEntry] = useState("main");
  // 백엔드에서 받은 이벤트 리스트
  const [events, setEvents] = useState<any[]>([]);
  // 현재 탐색 중인 스텝
  const [step, setStep] = useState(0);

  // 현재 이벤트 (라인 번호, locals 등)
  const curr = events[step] || null;
  // 현재 실행 중인 라인 번호 (하이라이트용)
  const highlight = useMemo(() => curr?.line ?? undefined, [curr]);

  /**
   * Run 버튼 클릭 시 호출
   * 1) 백엔드 /trace 로 코드와 entry 이름을 전송
   * 2) 결과(JSON) 받아서 events 상태에 저장
   */
  const run = async () => {
    setEvents([]);
    setStep(0);
    const res = await fetch("http://localhost:8000/trace", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, entry }),
    });

    const json = await res.json();
    console.log("TRACE JSON", json);
    setEvents(json.events || []);
    setStep(0);
  };

  return (
    <div className="min-h-dvh bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-6xl p-6 grid gap-6 lg:grid-cols-2">
        {/* 왼쪽: 코드 입력창 + 코드 뷰어 */}
        <div className="space-y-3">
          {/* 코드 입력 영역 */}
          <div className="rounded-2xl bg-neutral-900 p-4 border border-neutral-800">
            <div className="flex gap-2 mb-2">
              <button
                onClick={run}
                className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500"
              >
                Run
              </button>
              <input
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-sm"
                placeholder="entry function"
              />
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-56 md:h-72 rounded bg-neutral-950 border border-neutral-800 p-3 font-mono text-sm"
            />
          </div>

          {/* 코드 뷰어 (실행 중 라인 하이라이트 표시) */}
          <pre className="rounded-2xl bg-neutral-900 p-4 border border-neutral-800 overflow-auto text-sm">
            {code.split("\n").map((ln, i) => (
              <div
                key={i}
                className={highlight === i + 1 ? "bg-neutral-800/70" : ""}
              >
                <span className="mr-3 opacity-60 w-8 inline-block text-right select-none">
                  {i + 1}
                </span>
                <span>{ln || " "}</span>
              </div>
            ))}
          </pre>
        </div>

        {/* 오른쪽: 실행 단계 컨트롤 + 현재 상태 */}
        <div className="space-y-3">
          {/* ◀▶ 슬라이더로 스텝 이동 */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700"
            >
              ◀
            </button>
            <input
              type="range"
              min={0}
              max={Math.max(0, events.length - 1)}
              value={step}
              onChange={(e) => setStep(parseInt(e.target.value))}
              className="w-full"
            />
            <button
              onClick={() => setStep((s) => Math.min(events.length - 1, s + 1))}
              className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700"
            >
              ▶
            </button>
            <span className="text-xs opacity-70">
              {step}/{Math.max(0, events.length - 1)}
            </span>
          </div>

          {/* 현재 이벤트 내용 표시 */}
          <div className="rounded-2xl bg-neutral-900 p-4 border border-neutral-800">
            <h3 className="font-semibold mb-2">Current Event</h3>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(curr, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
