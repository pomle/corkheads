import { Bottling, createBottling } from "types/Bottling";
import merge from "deepmerge";
import { updatedDiff } from "deep-object-diff";
import { Article } from "types/Article";
import { UserArticle } from "types/UserArticle";

export function mergeBottling(bottlings: Bottling[]): Bottling {
  return merge.all(bottlings) as Bottling;
}

export function diffBottling(a: Bottling, b: Bottling): Bottling {
  return updatedDiff(a, b) as Bottling;
}

export function getPreferredBottling(
  article?: Article,
  userArticle?: UserArticle
) {
  const bottlings: Bottling[] = [createBottling()];
  if (article?.bottling) {
    bottlings.push(article.bottling);
  }
  if (userArticle?.bottling) {
    bottlings.push(userArticle.bottling);
  }
  return mergeBottling(bottlings);
}
