import React, { useRef } from "react";
import { MemoryRouter } from "react-router-dom";
import renderer, { act, ReactTestRenderer } from "react-test-renderer";
import { createPath, createCodec } from "lib/path";
import Screen from "../Screen";

const stringCodec = createCodec(
  (s: string) => s,
  (s: string) => s
);

const FakeTransition: React.FC<{ active: boolean }> = ({
  active,
  children,
}) => {
  return (
    <div className="transition">
      Active: {active ? "Yes" : "No"}
      <div className="transition-content">{children}</div>
    </div>
  );
};

const FakeContent: React.FC<{ params: any }> = ({ params }) => {
  const counter = useRef<number>(0);
  counter.current += 1;

  return (
    <div className="content">
      <div>Counter: {counter.current}</div>
      <div>Params: {JSON.stringify(params)}</div>
    </div>
  );
};

describe("Screen component", () => {
  let elementMock: jest.Mock;
  let transitionMock: jest.Mock;
  let testRenderer: ReactTestRenderer;

  const history = ["/router/123"];

  beforeEach(() => {
    jest.useFakeTimers();
    elementMock = jest.fn((params) => <FakeContent params={params} />);
    transitionMock = jest.fn(FakeTransition);
  });

  describe("when mounted on non-matching", () => {
    beforeEach(() => {
      const path = createPath("/not/router/url", {});
      testRenderer = renderer.create(
        <MemoryRouter initialEntries={history}>
          <Screen path={path}>{elementMock}</Screen>
        </MemoryRouter>
      );
    });

    it("has not mounted component", () => {
      const tree = testRenderer.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("has not called element", () => {
      expect(elementMock).toHaveBeenCalledTimes(0);
    });
  });

  describe("when mounted on non-matching with transition", () => {
    beforeEach(() => {
      const path = createPath("/not/router/url", {});
      testRenderer = renderer.create(
        <MemoryRouter initialEntries={history}>
          <Screen path={path} transition={transitionMock}>
            {elementMock}
          </Screen>
        </MemoryRouter>
      );
    });

    it("has not mounted component", () => {
      const tree = testRenderer.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("has set transition to not active", () => {
      expect(transitionMock).toHaveBeenCalledTimes(1);
      expect(transitionMock.mock.calls[0][0].active).toBe(false);
    });

    describe("then matching", () => {
      beforeEach(() => {
        const path = createPath("/router/123", {});
        testRenderer.update(
          <MemoryRouter initialEntries={history}>
            <Screen path={path} transition={transitionMock}>
              {elementMock}
            </Screen>
          </MemoryRouter>
        );
      });

      it("has mounted component", () => {
        const tree = testRenderer.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it("has set transition to active", () => {
        expect(transitionMock).toHaveBeenCalledTimes(2);
        expect(transitionMock.mock.calls[1][0].active).toBe(true);
      });
    });
  });

  describe("when mounted on matching", () => {
    beforeEach(() => {
      const path = createPath("/router/:myId", { myId: stringCodec });
      testRenderer = renderer.create(
        <MemoryRouter initialEntries={history}>
          <Screen path={path}>{elementMock}</Screen>
        </MemoryRouter>
      );
    });

    it("has mounted component", () => {
      const tree = testRenderer.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("has called element once", () => {
      expect(elementMock).toHaveBeenCalledTimes(1);
    });

    it("has called element with params", () => {
      expect(elementMock).toHaveBeenCalledWith({ myId: "123" });
    });

    describe("then updating", () => {
      beforeEach(() => {
        const path = createPath("/router/:myId", { myId: stringCodec });
        testRenderer.update(
          <MemoryRouter initialEntries={history}>
            <Screen path={path}>{elementMock}</Screen>
          </MemoryRouter>
        );
      });

      it("presents updated mounted component", () => {
        const tree = testRenderer.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it("is updating component", () => {
        expect(elementMock).toHaveBeenCalledTimes(2);
      });
    });

    describe("then unmatching", () => {
      beforeEach(() => {
        const path = createPath("/no/match", {});
        testRenderer.update(
          <MemoryRouter initialEntries={history}>
            <Screen path={path}>{elementMock}</Screen>
          </MemoryRouter>
        );
      });

      it("is still mounted", () => {
        const tree = testRenderer.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it("is not updating component", () => {
        expect(elementMock).toHaveBeenCalledTimes(1);
      });

      describe("after some time", () => {
        beforeEach(() => {
          act(() => {
            jest.advanceTimersByTime(5000);
          });
        });

        // Test works, bug with tools (shrug)
        it.skip("is unmounted", () => {
          const tree = testRenderer.toJSON();
          expect(tree).toMatchSnapshot();
        });
      });
    });
  });

  describe("when mounted on over-matching", () => {
    beforeEach(() => {
      const path = createPath("/router", {});
      testRenderer = renderer.create(
        <MemoryRouter initialEntries={history}>
          <Screen path={path}>{elementMock}</Screen>
        </MemoryRouter>
      );
    });

    it("has mounted component", () => {
      const tree = testRenderer.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("has called component", () => {
      expect(elementMock).toHaveBeenCalledTimes(1);
    });

    describe("then setting exact", () => {
      beforeEach(() => {
        const path = createPath("/router", {});
        testRenderer.update(
          <MemoryRouter initialEntries={history}>
            <Screen exact path={path}>
              {elementMock}
            </Screen>
          </MemoryRouter>
        );
      });

      it("is still mounted", () => {
        const tree = testRenderer.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it("has not called component", () => {
        expect(elementMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});
