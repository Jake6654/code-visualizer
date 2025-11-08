import { diffLocals } from "@/lib/diff";

export default function LocalsPanel({ prev, curr }: { prev: any; curr: any }) {
  const diff = diffLocals(prev, curr);
  const keys = Object.keys(diff);

  return (
    <div className="rounded-2xl bg-neutral-900 p-4 border border-neutral-800">
      <h3 className="font-semibold mb-2">Locals (diff)</h3>
      {keys.length === 0 ? (
        <div className="opacity-60 text-sm">No changes</div>
      ) : (
        <ul className="space-y-1 text-sm">
          {keys.map((k) => (
            <li key={k}>
              <span className="opacity-70">{k}</span>
              <span className="opacity-60">: </span>
              <span className="text-red-300/90">
                {JSON.stringify(diff[k].before)}
              </span>
              <span className="opacity-60"> → </span>
              <span className="text-green-300/90">
                {JSON.stringify(diff[k].after)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
