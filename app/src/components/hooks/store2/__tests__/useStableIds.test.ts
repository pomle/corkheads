import { renderHook } from "@testing-library/react-hooks";
import { useStableIds } from "../useStableIds";

describe("useStableIds", () => {
  const source = [
    "Alpha",
    "Beta",
    "Beta",
    "Citrus",
    "Citrus",
    "Delta",
    "Epsilon",
    "Foxtrot",
  ];

  it("returns source normalized", () => {
    const hook = renderHook(({ source }) => useStableIds(source), {
      initialProps: {
        source,
      },
    });

    expect(hook.result.current).toEqual([
      "Alpha",
      "Beta",
      "Citrus",
      "Delta",
      "Epsilon",
      "Foxtrot",
    ]);
  });

  it("returns reference to normalized if result was unchanged", () => {
    const hook = renderHook(({ source }) => useStableIds(source), {
      initialProps: {
        source,
      },
    });

    const ref = hook.result.current;

    hook.rerender({
      source: [
        "Alpha",
        "Alpha",
        "Alpha",
        "Alpha",
        "Beta",
        "Beta",
        "Beta",
        "Citrus",
        "Delta",
        "Epsilon",
        "Foxtrot",
      ],
    });

    expect(hook.result.current).toBe(ref);
  });

  it("returns same reference if reordered", () => {
    const hook = renderHook(({ source }) => useStableIds(source), {
      initialProps: {
        source: ["A", "B"],
      },
    });

    const ref = hook.result.current;

    hook.rerender({
      source: ["B", "A"],
    });

    expect(hook.result.current).toBe(ref);
  });

  it("returns same reference if identical added", () => {
    const hook = renderHook(({ source }) => useStableIds(source), {
      initialProps: {
        source: ["A", "B"],
      },
    });

    const ref = hook.result.current;

    hook.rerender({
      source: ["B", "B", "B", "A", "A", "A"],
    });

    expect(hook.result.current).toBe(ref);
  });

  it("returns same reference if identical removed", () => {
    const hook = renderHook(({ source }) => useStableIds(source), {
      initialProps: {
        source: ["B", "B", "B", "A", "A", "A"],
      },
    });

    const ref = hook.result.current;

    hook.rerender({
      source: ["A", "B"],
    });

    expect(hook.result.current).toBe(ref);
  });

  it("returns new reference if item added", () => {
    const hook = renderHook(({ source }) => useStableIds(source), {
      initialProps: {
        source: ["A", "B"],
      },
    });

    const ref = hook.result.current;

    hook.rerender({
      source: ["A", "B", "C"],
    });

    expect(hook.result.current).not.toBe(ref);
    expect(hook.result.current).toEqual(["A", "B", "C"]);
  });

  it("returns new reference if item removed", () => {
    const hook = renderHook(({ source }) => useStableIds(source), {
      initialProps: {
        source: ["A", "B", "C"],
      },
    });

    const ref = hook.result.current;

    hook.rerender({
      source: ["A", "B"],
    });

    expect(hook.result.current).not.toBe(ref);
    expect(hook.result.current).toEqual(["A", "B"]);
  });

  it("returns new reference if item changed", () => {
    const hook = renderHook(({ source }) => useStableIds(source), {
      initialProps: {
        source: ["A", "B", "C"],
      },
    });

    const ref = hook.result.current;

    hook.rerender({
      source: ["A", "X", "B"],
    });

    expect(hook.result.current).not.toBe(ref);
    expect(hook.result.current).toEqual(["A", "X", "B"]);
  });
});
