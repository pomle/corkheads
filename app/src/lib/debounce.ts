export function debounce<F extends (...args: any[]) => void>(
  fn: F,
  timeout: number
) {
  let timer: NodeJS.Timeout;

  return function call(...values: Parameters<F>) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...values), timeout);
  };
}
