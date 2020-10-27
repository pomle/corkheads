/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { renderHook, act } from "@testing-library/react-hooks";
import { useToggle } from "../useToggle";

describe("useToggle", () => {
  it("returns a Set", () => {
    const { result } = renderHook(() => useToggle<any>());
    expect(result.current[0]).toBeInstanceOf(Set);
  });

  it("defaults to empty", () => {
    const { result } = renderHook(() => useToggle<number>());
    expect(result.current[0].size).toEqual(0);
  });

  it("adds item when not existing", () => {
    const { result } = renderHook(() => useToggle<number>());

    act(() => {
      result.current[1](3);
    });
    expect(result.current[0].size).toEqual(1);
    expect(result.current[0].has(3)).toBe(true);
  });

  it("removes item when not existing", () => {
    const { result } = renderHook(() => useToggle<number>());

    act(() => {
      const toggle = result.current[1];
      toggle(3);
      toggle(1);
      toggle(2);
      toggle(3);
    });
    expect(result.current[0].size).toEqual(2);
    expect(result.current[0].has(1)).toBe(true);
    expect(result.current[0].has(2)).toBe(true);
    expect(result.current[0].has(3)).toBe(false);
  });

  it("can be cleared", () => {
    const { result } = renderHook(() => useToggle<number>());

    act(() => {
      const toggle = result.current[1];
      toggle(1);
      toggle(2);
      toggle(3);
    });
    expect(result.current[0].size).toEqual(3);
    act(() => {
      const clear = result.current[2];
      clear();
    });
    expect(result.current[0].size).toEqual(0);
  });
});
