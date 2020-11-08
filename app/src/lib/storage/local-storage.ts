export const EMPTY = Symbol("empty value");

export interface Storage<T> {
  get: () => unknown;
  set: (value: T) => void;
}

const createStorage = <T>(key: string): Storage<T> => {
  const localStorage = window.localStorage;

  const set = (data: T) => {
    const text = JSON.stringify(data);
    localStorage.setItem(key, text);
  };

  const get = () => {
    const text = localStorage.getItem(key);
    if (text === null) {
      return EMPTY;
    }
    try {
      return JSON.parse(text);
    } catch (error) {
      localStorage.removeItem(key);
      return EMPTY;
    }
  };

  return {
    get,
    set,
  };
};

export { createStorage };
