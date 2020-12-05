import Rating from "components/ui/indicators/Rating";
import { UserArticle } from "types/UserArticle";
import { upgradeRatingV0 } from "../Rating/upgrade";
import { v1, v2 } from "./revisions";

function hasV2Rating(source: any) {
  if ("score" in source?.rating && "love" in source?.rating) {
    return true;
  }
  return false;
}

function upgradeV1(source: v2 | v1): UserArticle {
  if (hasV2Rating(source)) {
    return source as UserArticle;
  }

  let output = { ...source } as any;
  if ("loveIt" in output) {
    output.rating = upgradeRatingV0(output);
    delete output.loveIt;
  }

  return output as UserArticle;
}

export const upgrade = upgradeV1;
