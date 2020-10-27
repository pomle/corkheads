export function ensureObject<T>(value: any): Partial<T> {
  try {
    Object.create(value);
    return { ...value };
  } catch (error) {
    return Object.create(null);
  }
}
