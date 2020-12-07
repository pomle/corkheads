export function isObject(source: unknown): source is object {
  return typeof source === "object" && source !== null;
}
