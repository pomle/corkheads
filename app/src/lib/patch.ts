import { Bottling, createBottling } from "types/Bottling";
import merge from "deepmerge";
import { addedDiff, updatedDiff } from "deep-object-diff";
import { Article } from "types/Article";
import { UserArticle } from "types/UserArticle";

function createSourceBottling(article?: Article) {
  const bottlings: Partial<Bottling>[] = [createBottling()];
  if (article?.bottling) {
    bottlings.push(article.bottling);
  }
  return merge.all(bottlings);
}

export function findDiff<T extends object>(a: T, b: T): Partial<T> {
  return merge.all([addedDiff(a, b), updatedDiff(a, b)]);
}

export function getPreferredBottling(
  article?: Article,
  userArticle?: UserArticle
): Bottling {
  const bottlings: Partial<Bottling>[] = [createSourceBottling(article)];
  if (userArticle?.bottling) {
    bottlings.push(userArticle.bottling);
  }
  return merge.all(bottlings) as Bottling;
}

export function getEffectiveBottlingChanges(
  bottling: Partial<Bottling>,
  article: Article
): Partial<Bottling> {
  const sourceBottling = createSourceBottling(article);
  return findDiff(sourceBottling, bottling);
}
