import { upgrade } from "../upgrade";

describe("Rating upgrade", () => {
  describe("v0 > v1", () => {
    [undefined, 1, 2, 3, 4, 5].forEach((score) => {
      it(`upgrades score when ${score}`, () => {
        const v0 = {
          rating: score,
          loveIt: false,
        };
        const v1 = upgrade(v0) as any;
        expect(v1.score).toBe(score);
        expect("loveIt" in v1).toBe(false);
      });
    });

    [true, false].forEach((state) => {
      it(`upgrades loveIt flag when ${state}`, () => {
        const v0 = {
          rating: 5,
          loveIt: state,
        };
        const v1 = upgrade(v0) as any;
        expect(v1.love).toBe(state);
        expect("loveIt" in v1).toBe(false);
      });
    });
  });
});
