import { Change } from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import {
  createNewAggregate,
  createRatingAggregateDelta,
  ensureRatingAggregate,
  ensureScore,
  getRating,
} from "../integrity";

describe("#ensureScore", () => {
  [0, 1.2, 0.1, 6, 5.5, 4.5].forEach((invalidScore) => {
    it(`throws if score is ${invalidScore}`, () => {
      expect(() => ensureScore(invalidScore)).toThrow();
    });
  });

  [1, 2, 3, 4, 5].forEach((validScore) => {
    it(`returns value if score is ${validScore}`, () => {
      expect(ensureScore(validScore)).toBe(validScore);
    });
  });
});

describe("#ensureRatingAggregate", () => {
  [
    0,
    1,
    null,
    undefined,
    [],
    { sum: 1 },
    { count: 1 },
    { count: 1, sum: null },
    { count: null, sum: 3 },
  ].forEach((invalidValue) => {
    it(`throws value is ${JSON.stringify(invalidValue)}`, () => {
      expect(() => ensureRatingAggregate(invalidValue)).toThrow();
    });
  });

  [
    { sum: 2, count: 5 },
    { sum: 2, count: 5, foo: "bar" },
  ].forEach((validValue) => {
    it(`returns clean rating if value is ${JSON.stringify(validValue)}`, () => {
      expect(ensureRatingAggregate(validValue)).toEqual({
        sum: 2,
        count: 5,
      });
    });
  });
});

describe("#getRating", () => {
  [
    0,
    1,
    null,
    undefined,
    [],
    { sum: 1 },
    { count: 1 },
    { count: 1, sum: null },
    { count: null, sum: 3 },
  ].forEach((invalidValue) => {
    it(`returns empty rating if value is ${JSON.stringify(
      invalidValue
    )}`, () => {
      expect(getRating(invalidValue)).toEqual({ sum: 0, count: 0 });
    });
  });

  [
    { sum: 2, count: 5 },
    { sum: 2, count: 5, foo: "bar" },
  ].forEach((validValue) => {
    it(`returns given rating if value is ${JSON.stringify(validValue)}`, () => {
      expect(getRating(validValue)).toEqual({
        sum: 2,
        count: 5,
      });
    });
  });
});

describe("#createRatingAggregateDelta", () => {
  it("returns blank score for no input", () => {
    expect(createRatingAggregateDelta(undefined, undefined)).toEqual({
      count: 0,
      sum: 0,
    });
  });

  it("returns a count increase with new score if no prev score", () => {
    expect(createRatingAggregateDelta(undefined, 5)).toEqual({
      count: 1,
      sum: 5,
    });
  });

  it("returns a count decrease with new score if no new score", () => {
    expect(createRatingAggregateDelta(5, undefined)).toEqual({
      count: -1,
      sum: -5,
    });
  });

  it("returns a count decrease with new score if no new score", () => {
    expect(createRatingAggregateDelta(5, undefined)).toEqual({
      count: -1,
      sum: -5,
    });
  });

  it("returns stable count diff with score decrease prev higher than next", () => {
    expect(createRatingAggregateDelta(5, 3)).toEqual({
      count: 0,
      sum: -2,
    });
  });

  it("returns stable count diff with score increase when prev higher than next", () => {
    expect(createRatingAggregateDelta(1, 5)).toEqual({
      count: 0,
      sum: 4,
    });
  });

  it("returns decreased count and withdraws old sum if next score invalid", () => {
    expect(createRatingAggregateDelta(5, ("5" as unknown) as number)).toEqual({
      count: -1,
      sum: -5,
    });
  });

  it("returns increased count and adds new sum if prev score invalid", () => {
    expect(createRatingAggregateDelta(("5" as unknown) as number, 5)).toEqual({
      count: 1,
      sum: 5,
    });
  });
});

describe("#createNewAggregate", () => {
  it("returns a new aggregate a new rating that is not existing", () => {
    const aggregate = createNewAggregate(
        ({
          before: {
            data() {
              return undefined;
            },
          },
          after: {
            data() {
              return { rating: 5 };
            },
          },
        } as unknown) as Change<DocumentSnapshot>,

        ({
          data() {
            return undefined;
          },
        } as unknown) as DocumentSnapshot
      );
    expect(aggregate).toEqual({ sum: 5, count: 1 });
  });

  it("returns a new aggregate for a new rating that is existing", () => {
    const aggregate = createNewAggregate(
      ({
        before: {
          data() {
            return { rating: 5 };
          },
        },
        after: {
          data() {
            return { rating: 3 };
          },
        },
      } as unknown) as Change<DocumentSnapshot>,

      ({
        data() {
          return { ratingAggregate: { sum: 5, count: 1 } };
        },
      } as unknown) as DocumentSnapshot
    );
    expect(aggregate).toEqual({ sum: 3, count: 1 });
  });

  it("returns a new aggregate for a deleted rating", () => {
    const aggregate = createNewAggregate(
      ({
        before: {
          data() {
            return { rating: 3 };
          },
        },
        after: {
          data() {
            undefined;
          },
        },
      } as unknown) as Change<DocumentSnapshot>,

      ({
        data() {
          return { ratingAggregate: { sum: 5, count: 2 } };
        },
      } as unknown) as DocumentSnapshot
    );
    expect(aggregate).toEqual({ sum: 2, count: 1 });
  });
});
