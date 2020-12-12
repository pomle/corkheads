export function asABV(percent: number | string) {
  if (typeof percent === "number") {
    return percent.toFixed(1) + "%";
  }
  return asPercent(percent);
}

export function asPercent(percent: number | string) {
  if (typeof percent === "number") {
    return percent.toString() + "%";
  }
  return percent.replace(/[^0-9,.]/g, "") + "%";
}
