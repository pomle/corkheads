import { DEFAULTS, UserArticle } from "types/UserArticle";
import { toMoment } from "types/convert";
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

    if (output?.collection?.addedTimestamp) {
      output.collection.addedTimestamp = toMoment(
        output.collection.addedTimestamp
      );
    }

    if (output?.wishlist?.addedTimestamp) {
      output.wishlist.addedTimestamp = toMoment(output.wishlist.addedTimestamp);
    }

    return output as UserArticle;
  }
  return DEFAULTS;
}
