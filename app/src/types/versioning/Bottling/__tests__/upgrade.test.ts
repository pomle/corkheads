import { upgrade } from "../upgrade";

describe("Bottling upgrade", () => {
  describe("Distill", () => {
    it("removes alcoholByVolumeFraction", () => {
      const v1 = {
        distill: {
          alcoholByVolumeFraction: 0.456,
        },
      };
      const v2 = upgrade({ distill: v1 });
      expect("alcoholByVolumeFraction" in v2.distill).toBe(false);
    });

    it("upgrades fraction to percent if percent not set", () => {
      const v1 = {
        distill: {
          alcoholByVolumeFraction: 0.456,
        },
      };
      const v2 = upgrade(v1);
      expect(v2.distill.alcoholByVolumePercentage).toEqual(45.6);
    });

    it("leaves existing alcoholByVolumePercentage", () => {
      const v1 = {
        distill: {
          alcoholByVolumeFraction: 0.456,
          alcoholByVolumePercentage: 56.55,
        },
      };
      const v2 = upgrade(v1);
      expect(v2.distill.alcoholByVolumePercentage).toEqual(56.55);
    });
  });
});
