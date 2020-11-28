import { findBestSizeMatch, Size, sizeMatchScore } from "../size";

describe("#sizeMatchScore", () => {
  const tests: [Size, Size, number][] = [
    [{ width: 100, height: 100 }, { width: 200, height: 200 }, 200],
    [{ width: 200, height: 200 }, { width: 100, height: 100 }, 200],
    [{ width: 1280, height: 1024 }, { width: 1920, height: 1080 }, 696],
    [{ width: 200, height: 200 }, { width: 200, height: 200 }, 0],
  ];

  tests.forEach(([a, b, score]) => {
    it(`produces score ${score} from ${a.width}x${a.height} vs ${b.width}x${b.height}`, () => {
      expect(sizeMatchScore(a, b)).toEqual(score);
    });
  });
});

describe("#findBestSizeMatch", () => {
  const candidates: Size[] = [
    { width: 640, height: 480 },
    { width: 1200, height: 1024 },
    { width: 1920, height: 1080 },
  ];

  const tests: { ideal: Size; match: Size }[] = [
    {
      ideal: { width: 1280, height: 1280 },
      match: candidates[1],
    },
    {
      ideal: { width: 480, height: 480 },
      match: candidates[0],
    },
    {
      ideal: { width: 3840, height: 3840 },
      match: candidates[2],
    },
  ];

  tests.forEach(({ ideal, match }) => {
    it(`returns ${match.width}x${match.height} for ${ideal.width}x${ideal.height}`, () => {
      expect(findBestSizeMatch(candidates, ideal)).toBe(match);
    });
  });
});
