import { clsx } from "clsx";

export default function CodeBox({
  code,
  highlightLine,
}: {
  code: string;
  highlightLine?: number;
}) {
  const lines = code.split("\n");
  return (
    <pre className="rounded-2xl bg-neutral-900 p-4 text-sm overflow-auto border border-neutral-800">
      {lines.map((ln, i) => (
        <div
          key={i}
          className={clsx(
            "tabular-nums",
            highlightLine === i + 1 && "bg-neutral-800/70"
          )}
        >
          <span className="mr-3 select-none opacity-60 w-8 inline-block text-right">
            {i + 1}
          </span>
          <span>{ln || " "}</span>
        </div>
      ))}
    </pre>
  );
}
