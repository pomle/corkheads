import * as functions from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { RatingAggregate } from "../types";

function createDefaultRatingAggregate(): RatingAggregate {
  return {
    count: 0,
    sum: 0,
  };
}

const validScores = [1, 2, 3, 4, 5];

export function validScore(score: any): boolean {
  if (typeof score !== "number") {
    return false;
  }
  if (!validScores.includes(score)) {
    return false;
  }
  return true;
}

export function ensureScore(score: any): number {
  if (!validScore(score)) {
    throw new Error(`invalid score ${JSON.stringify(score)}`);
  }
  return score;
}

export function ensureRatingAggregate(value: any): RatingAggregate {
  if (typeof value.sum !== "number") {
    throw new Error("sum not number");
  }
  if (typeof value.count !== "number") {
    throw new Error("count not number");
  }
  return {
    count: value.count,
    sum: value.sum,
  };
}

export function getRating(data: any): RatingAggregate {
  try {
    return ensureRatingAggregate(data);
  } catch (e) {
    return createDefaultRatingAggregate();
  }
}

export function createRatingAggregateDelta(
  prevRating: unknown,
  nextRating: unknown
) {
  const prevScore = getScore(prevRating);
  const nextScore = getScore(nextRating);

  const ratingDelta: RatingAggregate = {
    count: 0,
    sum: 0,
  };

  if (prevScore === undefined) {
    ratingDelta.count += 1;
  } else {
    if (validScore(prevScore)) {
      ratingDelta.sum -= prevScore;
    } else {
      ratingDelta.count += 1;
    }
  }

  if (nextScore === undefined) {
    ratingDelta.count -= 1;
  } else {
    if (validScore(nextScore)) {
      ratingDelta.sum += nextScore;
    } else {
      ratingDelta.count -= 1;
    }
  }

  return ratingDelta;
}

export function sumRatingAggregates(
  a: RatingAggregate,
  b: RatingAggregate
): RatingAggregate {
  return {
    count: a.count + b.count,
    sum: a.sum + b.sum,
  };
}

export function getScore(ratingField: unknown): number | undefined {
  if (typeof ratingField === "object") {
    const rating = ratingField ? (ratingField as { score?: number }) : {};
    return rating?.score;
  }
  if (typeof ratingField === "number") {
    return ratingField;
  }
  return;
}

export function createNewAggregate(
  userArticleChange: functions.Change<DocumentSnapshot>,
  article: functions.firestore.DocumentSnapshot
) {
  const ratingAggregate = getRating(article.data()?.ratingAggregate);

  const ratingAggregateDelta = createRatingAggregateDelta(
    userArticleChange.before.data()?.rating,
    userArticleChange.after.data()?.rating
  );

  return sumRatingAggregates(ratingAggregate, ratingAggregateDelta);
}
