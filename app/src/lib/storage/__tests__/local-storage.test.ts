import LocalStorageMock from "lib/mocks/LocalStorageMock";
import { Storage, createStorage, EMPTY } from "../local-storage";

describe("createStorage", () => {
  let localStorageMock: LocalStorageMock;

  beforeEach(() => {
    localStorageMock = new LocalStorageMock();
    // @ts-ignore
    global.localStorage = localStorageMock;
  });

  afterEach(() => {
    // @ts-ignore
    delete global.localStorage;
  });

  const key = "mock-key";

  it("supports storing number primitive", () => {
    const storage = createStorage<number>(key);
    storage.set(3);
    expect(storage.get()).toEqual(3);
  });

  it("supports storing string primitive", () => {
    const storage = createStorage<string>(key);
    storage.set("foobar");
    expect(storage.get()).toEqual("foobar");
  });

  it("supports storing boolean primitive", () => {
    const storage = createStorage<boolean>(key);
    storage.set(true);
    expect(storage.get()).toEqual(true);
  });

  it("returns EMPTY symbol when storage corrupt", () => {
    const storage = createStorage<{}>(key);
    localStorageMock.store[key] = "}}}";
    expect(storage.get()).toBe(EMPTY);
  });

  it("cleans up corrupt storage", () => {
    const storage = createStorage<{}>(key);
    localStorageMock.store[key] = "}}}";
    storage.get();
    expect(key in localStorageMock.store).toBe(false);
  });

  it("returns EMPTY symbol if nothing stored", () => {
    const storage = createStorage<{}>(key);
    expect(storage.get()).toBe(EMPTY);
  });

  describe("when using object shape", () => {
    type Shape = Partial<{
      a: number;
      b: string;
      c: boolean;
      d: {
        e: string;
      };
    }>;

    let storage: Storage<Shape>;

    beforeEach(() => {
      storage = createStorage<Shape>(key);
    });

    it("returns a copy of stored data", () => {
      const source = { a: 13, b: "x", c: false };
      storage.set(source);
      expect(storage.get()).not.toBe(source);
      expect(storage.get()).toEqual(source);
    });

    it("allows storing partial data", () => {
      storage.set({ a: 13 });
      expect(storage.get()).toEqual({ a: 13 });
    });

    it("does not merge", () => {
      storage.set({ a: 13 });
      storage.set({ b: "foo" });
      expect(storage.get()).toEqual({ b: "foo" });
    });

    it("returns everything stored even if it exceeds type", () => {
      const storedValue = { a: 1, foo: 2 };
      localStorageMock.store[key] = JSON.stringify(storedValue);
      expect(storage.get()).toEqual(storedValue);
    });
  });
});
