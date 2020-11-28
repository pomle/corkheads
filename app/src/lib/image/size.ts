export type Size = {
  width: number;
  height: number;
};

export function sizeMatchScore(a: Size, b: Size) {
  return Math.abs(a.width - b.width) + Math.abs(a.height - b.height);
}

export function findBestSizeMatch(sizes: Size[], ideal: Size) {
  return sizes.reduce((a, b) => {
    const scoreA = sizeMatchScore(a, ideal);
    const scoreB = sizeMatchScore(b, ideal);
    if (scoreA < scoreB) {
      return a;
    }
    return b;
  }, sizes[0]);
}
