import { upgrade } from "../upgrade";
import { v1 } from "../revisions";

describe("CheckIn upgrade", () => {
  describe("v1 > v2", () => {
    it("removes loveIt flag", () => {
      const v1: v1 = {
        id: "foo",
        userId: "user-1",
        articleId: "article-1",
        loveIt: true,
      };
      const v2 = upgrade(v1) as any;
      expect("loveIt" in v2).toBe(false);
    });

    [undefined, 1, 2, 3, 4, 5].forEach((score) => {
      it(`upgrades score when ${score}`, () => {
        const v1: v1 = {
          id: "foo",
          userId: "user-1",
          articleId: "article-1",
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
          userId: "user-1",
          articleId: "article-1",
          loveIt: state,
        };
        const v2 = upgrade(v1) as any;
        expect(v2.rating.love).toBe(state);
      });
    });
  });
});
