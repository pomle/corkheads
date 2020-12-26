import { Article } from "types/Article";
import { Bottling } from "types/Bottling";
import { UserArticle } from "types/UserArticle";
import {
  findDiff,
  getEffectiveBottlingChanges,
  getPreferredBottling,
} from "../patch";

describe("findDiff", () => {
  it("finds an added value", () => {
    expect(findDiff({ a: 1 }, { b: 2 })).toEqual({ b: 2 });
    expect(findDiff({ a: { b: { c: 1 } } }, { a: { b: { d: 2 } } })).toEqual({
      a: { b: { d: 2 } },
    });
  });

  it("finds an updated value", () => {
    expect(findDiff({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
    expect(findDiff({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } })).toEqual({
      a: { b: { c: 2 } },
    });
  });

  it("ignores an equal value", () => {
    expect(findDiff({ a: 1 }, { a: 1 })).toEqual({});
    expect(findDiff({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).toEqual(
      {}
    );
  });
});

describe("getEffectiveBottlingChanges", () => {
  it("ignores values from bottling that are equal in article", () => {
    const article: Article = {
      id: "",
      displayName: "",
      bottling: {
        barcodes: [],
        bottler: {
          country: "Sweden",
        },
        distill: {
          distillery: {
            country: "Norway",
          },
        },
        series: {},
      },
    };

    const bottling: Bottling = {
      barcodes: [],
      bottler: {
        country: "Sweden",
      },
      distill: {
        distillery: {
          country: "Norway",
        },
      },
      series: {},
    };

    const effective = getEffectiveBottlingChanges(bottling, article);
    expect(effective).toEqual({});
  });

  it("uses values from bottling that are updated from article", () => {
    const article: Article = {
      id: "",
      displayName: "",
      bottling: {
        barcodes: [],
        bottler: {
          country: "Sweden",
        },
        distill: {
          batch: {},
          cask: {},
          distillery: {
            country: "Norway",
          },
        },
        series: {},
      },
    };

    const bottling: Bottling = {
      barcodes: [],
      bottler: {
        country: "Sweden",
      },
      distill: {
        batch: {},
        cask: {},
        distillery: {
          country: "Svalbard",
        },
      },
      series: {},
    };

    const effective = getEffectiveBottlingChanges(bottling, article);
    expect(effective).toEqual({
      distill: {
        distillery: {
          country: "Svalbard",
        },
      },
    });
  });

  it("uses values from bottling that are added from article", () => {
    const article: Article = {
      id: "",
      displayName: "",
      bottling: {
        barcodes: [],
        bottler: {
          country: "Sweden",
        },
        distill: {
          batch: {},
          cask: {},
          distillery: {
            country: "Norway",
          },
        },
        series: {},
      },
    };

    const bottling: Bottling = {
      barcodes: [],
      bottler: {
        name: "Grythyttan",
        country: "Sweden",
      },
      distill: {
        batch: {},
        cask: {},
        distillery: {
          country: "Norway",
        },
      },
      series: {},
    };

    const effective = getEffectiveBottlingChanges(bottling, article);
    expect(effective).toEqual({
      bottler: {
        name: "Grythyttan",
      },
    });
  });

  it("works for article without bottling", () => {
    const effective = getEffectiveBottlingChanges(
      { bottlesProduced: 1337 },
      {} as Article
    );
    expect(effective).toEqual({
      bottlesProduced: 1337,
    });
  });
});

describe("getPreferredBottling", () => {
  it("returns blank Bottling if no candidate", () => {
    const bottling = getPreferredBottling(undefined, undefined);
    expect(bottling).toEqual({
      barcodes: [],
      bottler: {},
      distill: {
        batch: {},
        cask: {},
        distillery: {},
      },
      series: {},
    });
  });

  it("returns article data if no userArticle data given", () => {
    const article: Article = {
      id: "",
      displayName: "A",
      bottling: {
        barcodes: [],
        bottler: {
          name: "A",
        },
        distill: {
          batch: {},
          cask: {},
          distillery: {},
        },
        series: {
          name: "A",
        },
        bottlesProduced: 1000,
      },
    };

    const bottling = getPreferredBottling(article, undefined);
    expect(bottling).toEqual({
      barcodes: [],
      bottler: {
        name: "A",
      },
      displayName: "A",
      distill: {
        batch: {},
        cask: {},
        distillery: {},
      },
      series: {
        name: "A",
      },
      bottlesProduced: 1000,
    });
  });

  it("returns merge of data if both given", () => {
    const article: Article = {
      id: "",
      displayName: "A",
      bottling: {
        barcodes: [],
        bottler: {
          name: "A",
        },
        distill: {
          batch: {},
          cask: {},
          distillery: {},
        },
        series: {
          name: "A",
        },
        bottlesProduced: 1000,
      },
    };

    const userArticle: UserArticle = {
      id: "",
      checkIns: 0,
      bottling: {
        barcodes: [],
        bottler: {},
        distill: {
          batch: {},
          cask: {},
          distillery: {
            name: "B",
          },
        },
        series: {
          name: "B",
        },
        bottlesProduced: 2000,
      },
    };

    const bottling = getPreferredBottling(article, userArticle);
    expect(bottling).toEqual({
      barcodes: [],
      bottler: {
        name: "A",
      },
      displayName: "A",
      distill: {
        batch: {},
        cask: {},
        distillery: {
          name: "B",
        },
      },
      series: {
        name: "B",
      },
      bottlesProduced: 2000,
    });
  });

  it("returns complete data even if missing in source", () => {
    const short = {
      bottling: {
        bottler: {
          name: "Foo",
        },
      },
    };

    expect(getPreferredBottling(short as Article, undefined)).toEqual({
      barcodes: [],
      bottler: {
        name: "Foo",
      },
      distill: {
        batch: {},
        cask: {},
        distillery: {},
      },
      series: {},
    });

    expect(getPreferredBottling(undefined, short as UserArticle)).toEqual({
      barcodes: [],
      bottler: {
        name: "Foo",
      },
      distill: {
        batch: {},
        cask: {},
        distillery: {},
      },
      series: {},
    });
  });
});
