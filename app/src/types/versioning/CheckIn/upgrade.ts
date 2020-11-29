import { CheckIn } from "types/CheckIn";
import { upgradeRatingV0 } from "types/versioning/Rating/upgrade";
import { v1, v2 } from "./revisions";

function upgradeV1(source: v2 | v1): CheckIn {
  let output = { ...source } as any;

  if ("loveIt" in output) {
    output.rating = upgradeRatingV0(output);
    delete output.loveIt;
  }

  return output as CheckIn;
}

export const upgrade = upgradeV1;
