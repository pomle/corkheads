import { Bottling, createBottling } from "types/Bottling";
import merge from "deepmerge";
import { addedDiff, updatedDiff } from "deep-object-diff";
import { Article } from "types/Article";
import { UserArticle } from "types/UserArticle";

const DEFAULT_BOTTLING = createBottling();

export function mergeBottling(
  bottlings: Partial<Bottling>[]
): Partial<Bottling> {
  return merge.all(bottlings);
}

export function diffBottling(
  a: Partial<Bottling>,
  b: Partial<Bottling>
): Partial<Bottling> {
  const x = createBottling();
  return merge.all([addedDiff(x, b), updatedDiff(a, b)]);
}

export function getPreferredBottling(
  article?: Article,
  userArticle?: UserArticle
): Bottling {
  const bottlings: Partial<Bottling>[] = [DEFAULT_BOTTLING];
  if (article?.bottling) {
    bottlings.push(article.bottling);
  }
  if (userArticle?.bottling) {
    bottlings.push(userArticle.bottling);
  }
  return mergeBottling(bottlings) as Bottling;
}

export function getEffectiveBottlingChanges(
  bottling: Partial<Bottling>,
  article: Article
) {
  const bottlings = [DEFAULT_BOTTLING];
  if (article.bottling) {
    bottlings.push(article.bottling);
  }
  const sourceBottling = mergeBottling(bottlings);
  return diffBottling(sourceBottling, bottling);
}
