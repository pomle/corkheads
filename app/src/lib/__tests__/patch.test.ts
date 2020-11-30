import { Article } from "types/Article";
import { Bottling } from "types/Bottling";
import { UserArticle } from "types/UserArticle";
import {
  diffBottling,
  getEffectiveBottlingChanges,
  getPreferredBottling,
} from "../patch";

describe("getPreferredBottling", () => {
  const article: Article = {
    id: "",
    displayName: "A",
    manufacturer: "A",
    bottling: {
      barcodes: [],
      bottler: {
        name: "A",
      },
      distill: {
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
    owner: false,
    checkIns: 0,
    bottling: {
      barcodes: [],
      bottler: {},
      distill: {
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

  it("returns blank Bottling if no candidate", () => {
    const bottling = getPreferredBottling(undefined, undefined);
    expect(bottling).toEqual({
      barcodes: [],
      bottler: {},
      distill: {
        distillery: {},
      },
      series: {},
    });
  });

  it("returns article data if no userArticle data given", () => {
    const bottling = getPreferredBottling(article, undefined);
    expect(bottling).toEqual({
      barcodes: [],
      bottler: {
        name: "A",
      },
      distill: {
        distillery: {},
      },
      series: {
        name: "A",
      },
      bottlesProduced: 1000,
    });
  });

  it("returns merge of data if both given", () => {
    const bottling = getPreferredBottling(article, userArticle);
    expect(bottling).toEqual({
      barcodes: [],
      bottler: {
        name: "A",
      },
      distill: {
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
        distillery: {},
      },
      series: {},
    });
  });
});

describe("getEffectiveBottlingChanges", () => {
  const article: Article = {
    id: "",
    displayName: "",
    manufacturer: "",
    bottling: {
      barcodes: [],
      bottler: {
        name: "A",
      },
      distill: {
        distillery: {
          name: "Initial distillery name",
        },
      },
      series: {
        name: "Initial series name",
      },
      bottlesProduced: 1000,
    },
  };

  const bottling = {
    barcodes: [],
    bottler: {},
    distill: {
      distillery: {
        name: "Added",
      },
    },
    series: {
      name: "Updated",
    },
    bottlesProduced: 2000,
  };

  it("returns all values given for bottling that would be effective for article", () => {
    const effective = getEffectiveBottlingChanges(bottling, article);
    expect(effective).toEqual({
      distill: {
        distillery: {
          name: "Added",
        },
      },
      series: {
        name: "Updated",
      },
      bottlesProduced: 2000,
    });
  });

  it("works for article without bottling", () => {
    const bottling = {
      barcodes: [],
      bottler: {},
      distill: {
        distillery: {},
      },
      series: {},
      bottlesProduced: 2000,
    };

    const effective = getEffectiveBottlingChanges(
      { bottlesProduced: 1337 },
      {} as Article
    );
    expect(effective).toEqual({
      bottlesProduced: 1337,
    });
  });
});

describe("diffBottling", () => {
  const bottlingA = {
    bottler: {
      name: "Initial",
    },
    distill: {
      distillery: {},
    },
    series: {
      name: "Initial",
    },
    bottlesProduced: 1000,
  } as Bottling;

  const bottlingB = {
    barcodes: [],
    bottler: {},
    distill: {
      distillery: {
        name: "Added",
      },
    },
    series: {
      name: "Updated",
    },
    bottlesProduced: 2000,
  };

  it("returns values from B that are changed from A", () => {
    const partialBottling = diffBottling(bottlingA, bottlingB);
    expect(partialBottling).toEqual({
      distill: {
        distillery: {
          name: "Added",
        },
      },
      series: {
        name: "Updated",
      },
      bottlesProduced: 2000,
    });
  });

  it("creates minimal objects", () => {
    const partialBottling = diffBottling(bottlingA, { bottlesProduced: 2 });
    expect(partialBottling).toEqual({
      bottlesProduced: 2,
    });
  });
});
