import { upgrade } from "../upgrade";
import { v1 } from "../revisions";

describe("UserArticle upgrade", () => {
  describe("v1 > v2", () => {
    it("removes loveIt flag", () => {
      const v1: v1 = {
        id: "foo",
        checkIns: 3,
        owner: false,
        loveIt: true,
      };
      const v2 = upgrade(v1) as any;
      expect("loveIt" in v2).toBe(false);
    });

    [undefined, 1, 2, 3, 4, 5].forEach((score) => {
      it(`upgrades score when ${score}`, () => {
        const v1: v1 = {
          id: "foo",
          checkIns: 3,
          owner: false,
          rating: score,
          loveIt: false,
        };
        const v2 = upgrade(v1) as any;
        expect(v2.rating.score).toBe(score);
      });
    });

    [true, false].forEach((state) => {
      it(`upgrades loveIt flag when ${state}`, () => {
        const v1: v1 = {
          id: "foo",
          checkIns: 3,
          owner: false,
          loveIt: state,
        };
        const v2 = upgrade(v1) as any;
        expect(v2.rating.love).toBe(state);
      });
    });
  });

  describe("Distill", () => {
    it("removes alcoholByVolumeFraction", () => {
      const x = {
        bottling: {
          distill: {
            alcoholByVolumeFraction: 0.456,
          },
        },
      };
      const y = upgrade(x);
      // @ts-ignore
      expect("alcoholByVolumeFraction" in y?.bottling?.distill).toBe(false);
    });

    it("upgrades fraction to percent if percent not set", () => {
      const x = {
        bottling: {
          distill: {
            alcoholByVolumeFraction: 0.456,
          },
        },
      };
      const y = upgrade(x);
      expect(y.bottling?.distill.alcoholByVolumePercentage).toEqual(45.6);
    });

    it("leaves existing alcoholByVolumePercentage", () => {
      const x = {
        bottling: {
          distill: {
            alcoholByVolumeFraction: 0.456,
            alcoholByVolumePercentage: 56.55,
          },
        },
      };
      const y = upgrade(x);
      expect(y.bottling?.distill.alcoholByVolumePercentage).toEqual(56.55);
    });
  });
});
