import { throttle } from "../throttle";

describe("throttle", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("does not call until timeout reached", () => {
    const spy = jest.fn();
    const fn = throttle(spy, 1000);
    fn();
    expect(spy).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(999);
    expect(spy).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("only calls once", () => {
    const spy = jest.fn();
    const fn = throttle(spy, 1000);
    fn();
    fn();
    fn();
    fn();
    fn();
    fn();
    fn();
    expect(spy).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000);
    expect(spy).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(2000);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("calls regardless of previous calls after timeout reached", () => {
    const spy = jest.fn();
    const fn = throttle(spy, 1000);
    fn();
    expect(spy).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(999);
    expect(spy).toHaveBeenCalledTimes(0);

    fn();
    jest.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("queues up a new call after called", () => {
    const spy = jest.fn();
    const fn = throttle(spy, 1000);

    fn();
    jest.advanceTimersByTime(1000);
    expect(spy).toHaveBeenCalledTimes(1);

    fn();
    jest.advanceTimersByTime(1000);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
