/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import { useQueryPoll } from "../useQueryPoll";

type MockQuery = {
  startPolling: jest.Mock;
  stopPolling: jest.Mock;
};

describe("useQueryPoll", () => {
  let mockQuery: MockQuery;
  let hook: RenderHookResult<
    { interval: number; query: MockQuery; active: boolean },
    any
  >;

  beforeEach(() => {
    mockQuery = {
      startPolling: jest.fn(),
      stopPolling: jest.fn()
    };
  });

  describe("when mounted", () => {
    beforeEach(() => {
      hook = renderHook(
        ({ query, interval, active }) =>
          useQueryPoll(query, interval, { active }),
        {
          initialProps: {
            query: mockQuery,
            interval: 1000,
            active: true
          }
        }
      );
    });

    it("calls startPolling", () => {
      expect(mockQuery.startPolling).toHaveBeenCalledTimes(1);
    });

    it("calls startPolling with given interval", () => {
      expect(mockQuery.startPolling).toHaveBeenCalledWith(1000);
    });

    it("does not call stopPolling", () => {
      expect(mockQuery.stopPolling).toHaveBeenCalledTimes(0);
    });

    describe("and rerendered", () => {
      beforeEach(() => {
        hook.rerender();
        hook.rerender();
        hook.rerender();
        hook.rerender();
      });

      it("does not restart polling", () => {
        expect(mockQuery.startPolling).toHaveBeenCalledTimes(1);
        expect(mockQuery.stopPolling).toHaveBeenCalledTimes(0);
      });
    });

    describe("then unmounted", () => {
      beforeEach(() => {
        hook.unmount();
      });

      it("calls stopPolling", () => {
        expect(mockQuery.stopPolling).toHaveBeenCalledTimes(1);
      });

      it("has not called startPolling again", () => {
        expect(mockQuery.startPolling).toHaveBeenCalledTimes(1);
      });
    });

    describe("then query updated without polling functions updated", () => {
      beforeEach(() => {
        hook.rerender({
          query: { ...mockQuery },
          interval: 1000,
          active: true
        });
      });

      it("does not call startPolling", () => {
        expect(mockQuery.startPolling).toHaveBeenCalledTimes(1);
      });

      it("does not call stopPolling", () => {
        expect(mockQuery.stopPolling).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe("when active flag not set", () => {
    beforeEach(() => {
      hook = renderHook(() => useQueryPoll(mockQuery, 1000));
    });

    it("defaults to active", () => {
      expect(mockQuery.startPolling).toHaveBeenCalledTimes(1);
    });
  });

  describe("when active flag false", () => {
    beforeEach(() => {
      hook = renderHook(
        ({ query, interval, active }) =>
          useQueryPoll(query, interval, { active }),
        {
          initialProps: {
            query: mockQuery,
            interval: 1000,
            active: false
          }
        }
      );
    });

    it("does not start polling", () => {
      expect(mockQuery.startPolling).toHaveBeenCalledTimes(0);
      expect(mockQuery.stopPolling).toHaveBeenCalledTimes(0);
    });

    describe("and active flag become true", () => {
      beforeEach(() => {
        hook.rerender({
          query: mockQuery,
          interval: 1000,
          active: true
        });
      });

      it("starts up polling", () => {
        expect(mockQuery.startPolling).toHaveBeenCalledTimes(1);
        expect(mockQuery.stopPolling).toHaveBeenCalledTimes(0);
      });

      describe("and active flag become false", () => {
        beforeEach(() => {
          hook.rerender({
            query: mockQuery,
            interval: 1000,
            active: false
          });
        });

        it("shuts down polling", () => {
          expect(mockQuery.startPolling).toHaveBeenCalledTimes(1);
          expect(mockQuery.stopPolling).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
