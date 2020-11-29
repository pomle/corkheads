import { UserArticle } from "types/UserArticle";
import { upgradeRatingV0 } from "../Rating/upgrade";
import { v1, v2 } from "./revisions";

function upgradeV1(source: v2 | v1): UserArticle {
  let output = { ...source } as any;

  if ("loveIt" in output) {
    output.rating = upgradeRatingV0(output);
    delete output.loveIt;
  }

  return output as UserArticle;
}

export const upgrade = upgradeV1;
