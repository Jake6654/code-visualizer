export function diffLocals(prev: any, curr: any) {
  const changed: Record<string, { before: any; after: any }> = {};
  const keys = new Set([
    ...Object.keys(prev || {}),
    ...Object.keys(curr || {}),
  ]);

  keys.forEach((k) => {
    const a = prev?.[k];
    const b = curr?.[k];
    if (JSON.stringify(a) !== JSON.stringify(b))
      changed[k] = { before: a, after: b };
  });
  return changed;
}
