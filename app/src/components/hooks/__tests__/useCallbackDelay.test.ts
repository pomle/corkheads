/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { renderHook, act } from "@testing-library/react-hooks";
import { useCallbackDelay } from "../useCallbackDelay";

describe("useCallbackDelay", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("calls given function after a timeout once", () => {
    const TIMEOUT = 1000;
    const spy = jest.fn();
    const { result } = renderHook(() => useCallbackDelay(spy, TIMEOUT));
    expect(spy).not.toHaveBeenCalled();
    act(() => {
      result.current();
    });
    expect(spy).not.toHaveBeenCalled();
    jest.advanceTimersByTime(TIMEOUT - 1);
    expect(spy).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(TIMEOUT * 2);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
