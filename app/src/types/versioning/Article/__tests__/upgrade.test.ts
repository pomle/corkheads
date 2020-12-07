import { upgrade } from "../upgrade";

describe("Article upgrade", () => {
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
