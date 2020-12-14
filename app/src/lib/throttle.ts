export function throttle<F extends (...args: any[]) => void>(
  fn: F,
  timeout: number
) {
  let set: boolean = false;

  return function call(...values: Parameters<F>) {
    if (set) {
      return;
    }

    setTimeout(() => {
      set = false;
      fn(...values);
    }, timeout);

    set = true;
  };
}
