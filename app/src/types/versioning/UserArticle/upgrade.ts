import { DEFAULTS, UserArticle } from "types/UserArticle";
import { upgradeRatingV0 } from "../Rating/upgrade";
import { upgrade as upgradeBottling } from "../Bottling/upgrade";
import { isObject } from "../identify";

export function upgrade(source: unknown): UserArticle {
  if (isObject(source)) {
    let output = { ...source } as any;

    if ("bottling" in output) {
      output.bottling = upgradeBottling(output.bottling);
    }

    if ("loveIt" in output) {
      output.rating = upgradeRatingV0(output);
      delete output.loveIt;
    }

    return output as UserArticle;
  }
  return DEFAULTS;
}
