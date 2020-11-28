import { Article } from "types/Article";
import { Bottling, createBottling } from "types/Bottling";
import { UserArticle } from "types/UserArticle";
import merge from "deepmerge";
import { updatedDiff } from "deep-object-diff";

function effectiveBottling(bottlings: Bottling[]): Bottling {
  return merge.all(bottlings) as Bottling;
}

export function diffBottling(a: Bottling, b: Bottling): Bottling {
  return updatedDiff(a, b) as Bottling;
}

export function getBottling(article: Article, userArticle: UserArticle) {
  const bottlings: Bottling[] = [createBottling()];
  if (article.bottling) {
    bottlings.push(article.bottling);
  }
  if (userArticle.bottling) {
    bottlings.push(userArticle.bottling);
  }
  return effectiveBottling(bottlings);
}
