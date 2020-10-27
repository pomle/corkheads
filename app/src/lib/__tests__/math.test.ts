import { clamp } from "../math";

describe("clamp", () => {
  [
    [3, 0, 2, 2],
    [-3, 0, 2, 0],
    [10, 0, 20, 10],
    [30, 0, 20, 20]
  ].forEach(([input, min, max, output]) => {
    it(`returns ${output} for input ${input} when min is ${min} and max is ${max}`, () => {
      expect(clamp(input, min, max)).toEqual(output);
    });
  });
});
