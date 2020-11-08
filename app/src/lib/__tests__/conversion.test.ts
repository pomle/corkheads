import { ensureObject } from "../conversion";

describe("ensureObject", () => {
  [
    true,
    false,
    undefined,
    null,
    {},
    "string",
    12412,
    -12141,
    [],
    ["a", "b"],
    {},
  ].forEach((value) => {
    it(`returns an object when value is ${typeof value}`, () => {
      const result = ensureObject(value);
      expect(typeof result).toBe("object");
      expect(result instanceof Array).toBe(false);
      expect(result).toEqual(expect.objectContaining({}));
    });
  });

  it("returns a copy of given object", () => {
    const input = { a: 1, b: "", c: true };
    const output = ensureObject(input);
    expect(input).toEqual(output);
    expect(input).not.toBe(output);
  });
});
