export default function Timeline({
  step,
  max,
  onChange,
}: {
  step: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700"
        onClick={() => onChange(Math.max(0, step - 1))}
      >
        ◀
      </button>
      <input
        type="range"
        min={0}
        max={Math.max(0, max)}
        value={step}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full"
      />
      <button
        className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700"
        onClick={() => onChange(Math.min(max, step + 1))}
      >
        ▶
      </button>
      <span className="text-xs opacity-70">
        {step}/{max}
      </span>
    </div>
  );
}
