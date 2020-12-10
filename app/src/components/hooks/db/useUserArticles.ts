import { useFlatResult, useStore } from "components/hooks/useStore";
import { useMemo } from "react";
import { Article } from "types/Article";
import { Entry } from "types/Entry";
import { UserArticle } from "types/UserArticle";
import { useArticles } from "./useArticles";
import { useUserCollection } from "./useCollection";

export function useUserArticles(userId: string, articleIds: string[]) {
  const collection = useUserCollection(userId).userArticle;
  return useStore<UserArticle>(collection, articleIds);
}

export function useUserArticle(userId: string, articleId: string) {
  const result = useUserArticles(userId, [articleId]);
  return useFlatResult(articleId, result);
}

type UserArticleTuple = {
  articleEntry: Entry<Article>;
  userArticleEntry: Entry<UserArticle>;
};

export function useUserArticleTuple(
  userId: string,
  articleIds: string[]
): UserArticleTuple[] | null {
  const articleEntries = useArticles(articleIds);
  const userArticleEntries = useUserArticles(userId, articleIds);

  return useMemo(() => {
    if (!articleEntries || !userArticleEntries) {
      return null;
    }

    const results: UserArticleTuple[] = [];

    for (const id of articleIds) {
      const articleEntry = articleEntries[id];
      const userArticleEntry = userArticleEntries[id];

      if (!articleEntry || !userArticleEntry) {
        return null;
      }

      results.push({
        articleEntry,
        userArticleEntry,
      });
    }

    return results;
  }, [articleIds, articleEntries, userArticleEntries]);
}
