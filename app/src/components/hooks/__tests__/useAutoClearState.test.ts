/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { renderHook, act } from "@testing-library/react-hooks";
import { useAutoClearState } from "../useAutoClearState";

describe("useAutoClearState", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("has undefined as default empty value", () => {
    const { result } = renderHook(() => useAutoClearState(1000));
    expect(result.current[0]).toBe(undefined);
  });

  it("honors default value when set", () => {
    const DEFAULT = Symbol("default");
    const { result } = renderHook(() => useAutoClearState(1000, DEFAULT));
    expect(result.current[0]).toBe(DEFAULT);
  });

  it("returns set value when set", () => {
    const WANTED = Symbol("wanted");
    const { result } = renderHook(() => useAutoClearState(1000));
    act(() => {
      const [, setValue] = result.current;
      setValue(WANTED);
    });
    expect(result.current[0]).toBe(WANTED);
  });

  it("unsets value after given timeout", () => {
    const TIMEOUT = 1232;
    const DEFAULT = Symbol("default");
    const WANTED = Symbol("wanted");
    const { result } = renderHook(() =>
      useAutoClearState<symbol>(TIMEOUT, DEFAULT)
    );
    act(() => {
      const [, setValue] = result.current;
      setValue(WANTED);
      jest.advanceTimersByTime(TIMEOUT - 1);
    });
    expect(result.current[0]).toBe(WANTED);
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current[0]).toBe(DEFAULT);
  });
});
