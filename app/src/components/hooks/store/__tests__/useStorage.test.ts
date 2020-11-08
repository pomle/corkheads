/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import {
  renderHook,
  act,
  RenderHookResult,
} from "@testing-library/react-hooks";
import LocalStorageMock from "lib/mocks/LocalStorageMock";
import { SharedStateContext } from "components/context/SharedState";
import { useStorage } from "../useStorage";

describe("useStorage", () => {
  let localStorage: LocalStorageMock;

  beforeEach(() => {
    localStorage = new LocalStorageMock();
    // @ts-ignore
    global.localStorage = localStorage;
    jest.useFakeTimers();
  });

  afterEach(() => {
    // @ts-ignore
    delete global.localStorage;
    jest.clearAllTimers();
  });

  type Shape = {
    amount: number;
    name: string;
    optional?: string;
    untouched: string;
  };

  const DEFAULT: Shape = {
    amount: 1337,
    name: "Foobar",
    untouched: "Use me to ensure defaults remain",
  };

  const NAMESPACE = "fake-namespace";

  let hook: RenderHookResult<
    { namespace: string; defaults: Shape },
    [Shape, (value: Partial<Shape>) => void]
  >;

  [
    "}}}",
    "perfectly normal string",
    "1",
    "true",
    "false",
    "",
    JSON.stringify("json serialized string"),
    JSON.stringify(true),
    JSON.stringify(false),
    JSON.stringify(12314),
    JSON.stringify(undefined),
  ].forEach((storedString) => {
    it(`returns default when store contains ${storedString}`, () => {
      localStorage.setItem(NAMESPACE, storedString);

      hook = renderHook(() => useStorage<Shape>(NAMESPACE, DEFAULT), {
        wrapper: SharedStateContext,
      });

      expect(hook.result.current[0]).toEqual(DEFAULT);
    });
  });

  describe("when mounted", () => {
    beforeEach(() => {
      hook = renderHook(
        ({ namespace, defaults }) => useStorage<Shape>(namespace, defaults),
        {
          wrapper: SharedStateContext,
          initialProps: {
            namespace: NAMESPACE,
            defaults: DEFAULT,
          },
        }
      );
    });

    it("returns default value unless stored", () => {
      expect(hook.result.current[0]).toEqual(DEFAULT);
    });

    it("honors storing falsy values", () => {
      act(() => {
        hook.result.current[1]({ amount: 0, name: "" });
      });

      expect(hook.result.current[0].amount).toEqual(0);
      expect(hook.result.current[0].name).toEqual("");
    });

    describe("when values stored", () => {
      beforeEach(() => {
        act(() => {
          hook.result.current[1]({ amount: 2000 });
        });
      });

      it("new value is available immediately", () => {
        expect(hook.result.current[0].amount).toEqual(2000);
      });

      it("untouched values are maintained", () => {
        expect(hook.result.current[0].untouched).toEqual(DEFAULT.untouched);
      });

      describe("then more values stored", () => {
        beforeEach(() => {
          act(() => {
            hook.result.current[1]({ name: "Cowboy" });
          });
        });

        it("new value is honored", () => {
          expect(hook.result.current[0].name).toEqual("Cowboy");
        });

        it("previously set values persisted beyond default", () => {
          expect(hook.result.current[0].amount).toEqual(2000);
        });

        describe("then default changes", () => {
          beforeEach(() => {
            act(() => {
              hook.rerender({
                namespace: NAMESPACE,
                defaults: {
                  amount: 1241215125,
                  name:
                    "I am already set explicitly so should not be available",
                  untouched: "I am a new default",
                },
              });
            });
          });

          it("provides new default for untouched value", () => {
            expect(hook.result.current[0].untouched).toEqual(
              "I am a new default"
            );
          });

          it("reads touched values from storage", () => {
            expect(hook.result.current[0].amount).toEqual(2000);
            expect(hook.result.current[0].name).toEqual("Cowboy");
          });
        });
      });

      describe("when namespace changes", () => {
        beforeEach(() => {
          act(() => {
            hook.rerender({
              namespace: "other-mock-namespace",
              defaults: DEFAULT,
            });
          });
        });

        it("values go back to default", () => {
          expect(hook.result.current[0].amount).toEqual(1337);
        });

        it("values can be set for new namespace", () => {
          act(() => {
            hook.result.current[1]({ name: "new namespace name" });
          });

          expect(hook.result.current[0].name).toEqual("new namespace name");
        });

        describe("and then changes back", () => {
          beforeEach(() => {
            act(() => {
              hook.rerender({
                namespace: NAMESPACE,
                defaults: DEFAULT,
              });
            });
          });

          it("values are taken from expected namespace", () => {
            expect(hook.result.current[0].amount).toEqual(2000);
            expect(hook.result.current[0].name).toEqual("Foobar");
          });
        });
      });

      describe("and hook unmounts and remounts", () => {
        beforeEach(() => {
          act(() => {
            hook.unmount();

            // There is a debounce in persist layer to
            // avoid hammering with local storage serializations.
            jest.advanceTimersByTime(5000);

            hook = renderHook(() => useStorage<Shape>(NAMESPACE, DEFAULT), {
              wrapper: SharedStateContext,
            });
          });
        });

        it("set value has persisted (in local storage)", () => {
          expect(hook.result.current[0].amount).toEqual(2000);
        });
      });
    });
  });
});
