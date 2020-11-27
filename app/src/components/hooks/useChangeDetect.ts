import { useEffect } from "react";

export function useChangeDetect(value: unknown, tag: string = "changed") {
  useEffect(() => {
    console.log(tag, value);
  }, [value, tag]);
}
