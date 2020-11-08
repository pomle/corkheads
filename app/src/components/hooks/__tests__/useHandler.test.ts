/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import {
  renderHook,
  act,
  RenderHookResult,
} from "@testing-library/react-hooks";
import { useHandler, HandlerState } from "../useHandler";

describe("useHandler", () => {
  let result: RenderHookResult<unknown, HandlerState<symbol[]>>["result"];
  let asyncCallback: (...args: symbol[]) => Promise<any>;
  let resolve: (value?: any) => void;
  let reject: (err: string) => void;

  beforeEach(() => {
    asyncCallback = jest.fn(
      () =>
        new Promise((res, rej) => {
          resolve = res;
          reject = rej;
        })
    );
  });

  describe("on initial render", () => {
    beforeEach(() => {
      result = renderHook(() => useHandler(asyncCallback)).result;
    });

    it("has busy flag set to false", () => {
      expect(result.current.busy).toBe(false);
    });

    it("contains no error", () => {
      expect(result.current.error).toBe(null);
    });
  });

  describe("when callback called", () => {
    const FAKE_ARGS = [Symbol("arg1"), Symbol("arg2")];

    beforeEach(() => {
      result = renderHook(() => useHandler(asyncCallback)).result;
      act(() => {
        result.current.callback(...FAKE_ARGS);
      });
    });

    it("has busy flag set to true", () => {
      expect(result.current.busy).toBe(true);
    });

    it("calls wrapped callback once", () => {
      expect(asyncCallback).toHaveBeenCalledTimes(1);
    });

    it("calls wrapped callback with given args", () => {
      expect(asyncCallback).toHaveBeenCalledWith(...FAKE_ARGS);
    });

    it("prevents hammering while in flight", () => {
      act(() => {
        result.current.callback();
        result.current.callback();
        result.current.callback();
        result.current.callback();
        result.current.callback();
      });
      expect(asyncCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe("when callback called and resolved", () => {
    beforeEach(async () => {
      result = renderHook(() => useHandler(asyncCallback)).result;
      await act(async () => {
        result.current.callback();
        resolve();
      });
    });

    it("has busy flag set to false", () => {
      expect(result.current.busy).toBe(false);
    });

    it("exactly one of the original calls have been made", () => {
      expect(asyncCallback).toHaveBeenCalledTimes(1);
    });

    it("subsequent calls can be made", () => {
      act(() => {
        result.current.callback();
      });
      expect(asyncCallback).toHaveBeenCalledTimes(2);
    });
  });

  describe("when callback called and rejected", () => {
    beforeEach(async () => {
      result = renderHook(() => useHandler(asyncCallback)).result;
      await act(async () => {
        result.current.callback();
        reject("fault");
      });
    });

    it("has busy flag set to false", () => {
      expect(result.current.busy).toBe(false);
    });

    it("provides error", () => {
      expect(result.current.error).toBe("fault");
    });

    it("exactly one of the original calls have been made", () => {
      expect(asyncCallback).toHaveBeenCalledTimes(1);
    });

    it("subsequent calls can be made", () => {
      act(() => {
        result.current.callback();
      });
      expect(asyncCallback).toHaveBeenCalledTimes(2);
    });

    describe("and called again", () => {
      beforeEach(() => {
        act(() => {
          result.current.callback();
        });
      });

      it("error state is unset", () => {
        expect(result.current.error).toBe(null);
      });
    });
  });
});
