import { upgrade } from "../upgrade";

describe("Distill upgrade", () => {
  describe("v1 > v2", () => {
    it("removes alcoholByVolumeFraction", () => {
      const v1 = {
        alcoholByVolumeFraction: 0.456,
      };
      const v2 = upgrade(v1);
      expect("alcoholByVolumeFraction" in v2).toBe(false);
    });

    it("upgrades fraction to percent if percent not set", () => {
      const v1 = {
        alcoholByVolumeFraction: 0.456,
      };
      const v2 = upgrade(v1);
      expect(v2.alcoholByVolumePercentage).toEqual(45.6);
    });

    it("leaves existing alcoholByVolumePercentage", () => {
      const v1 = {
        alcoholByVolumeFraction: 0.456,
        alcoholByVolumePercentage: 56.55,
      };
      const v2 = upgrade(v1);
      expect(v2.alcoholByVolumePercentage).toEqual(56.55);
    });
  });
});
