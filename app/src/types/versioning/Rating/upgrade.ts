import { Rating } from "types/Rating";
import { v1 } from "./revisions";

/*
    Create a Rating object from possibly inlined values from a source.
*/
type v0 = {
  rating?: number;
  loveIt: boolean;
};

export function upgradeRatingV0({ rating, loveIt }: v0): v1 {
  return {
    score: rating,
    love: !!loveIt,
  };
}

export function upgrade(source: v1 | v0): Rating {
  if (
    "rating" in source &&
    (typeof source.rating === "number" || typeof source.rating === "undefined")
  ) {
    return upgradeRatingV0(source);
  }
  return source as Rating;
}
