import { DEFAULTS, Article } from "types/Article";
import { upgrade as upgradeBottling } from "../Bottling/upgrade";
import { isObject } from "../identify";

export function upgrade(source: unknown): Article {
  if (isObject(source)) {
    let output = { ...source } as any;

    if ("bottling" in output) {
      output.bottling = upgradeBottling(output.bottling);
    }

    return output as Article;
  }
  return DEFAULTS;
}
