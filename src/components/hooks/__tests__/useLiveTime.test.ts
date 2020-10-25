/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import {
  renderHook,
  RenderHookResult,
  act
} from "@testing-library/react-hooks";
import { DurationInputArg2 as Unit, Moment } from "moment";
import { useLiveTime } from "../useLiveTime";

jest.mock("moment", () => {
  return () => jest.requireActual("moment")("2020-01-01T00:00:27.000Z");
});

jest.useFakeTimers();

describe("useLiveTime", () => {
  let hook: RenderHookResult<{ unit: Unit }, Moment>;

  describe("when mounted", () => {
    beforeEach(() => {
      hook = renderHook(({ unit }) => useLiveTime(unit), {
        initialProps: {
          unit: "minute" as Unit
        }
      });
    });

    it("state represents current time", () => {
      expect(hook.result.current.toISOString()).toEqual(
        "2020-01-01T00:00:27.000Z"
      );
    });

    describe("when time has not passed next unit", () => {
      beforeEach(() => {
        act(() => {
          jest.runTimersToTime(1000 * 32);
        });
      });

      it("state represents the initial time", () => {
        expect(hook.result.current.toISOString()).toEqual(
          "2020-01-01T00:00:27.000Z"
        );
      });
    });

    describe("when time has passed the next unit", () => {
      beforeEach(() => {
        act(() => {
          jest.runTimersToTime(1000 * 33);
        });
      });

      it("state represents the new time", () => {
        expect(hook.result.current.toISOString()).toEqual(
          "2020-01-01T00:01:00.000Z"
        );
      });
    });

    describe("when rerendering and not passing into the new unit", () => {
      let reference: Moment;

      beforeEach(() => {
        reference = hook.result.current;
        hook.rerender();

        act(() => {
          jest.runTimersToTime(1000 * 10);
        });

        hook.rerender();
      });

      it("it returns the same reference to Moment object", () => {
        expect(reference).toBe(hook.result.current);
      });
    });
  });
});
