import { useFlatResult, useStore } from "components/hooks/store2/useStore";
import { useMemo } from "react";
import { Article } from "types/Article";
import { Entry } from "types/Entry";
import { UserArticle } from "types/UserArticle";
import { useArticles } from "./useArticles";
import { useUserCollection } from "./useCollection";

export function useUserArticles(articleIds: string[], userId: string) {
  const collection = useUserCollection(userId).userArticle;
  return useStore<UserArticle>(collection, articleIds);
}

export function useUserArticle(articleId: string, userId: string) {
  const result = useUserArticles([articleId], userId);
  return useFlatResult(articleId, result);
}

type UserArticleTuple = {
  articleEntry: Entry<Article>;
  userArticleEntry: Entry<UserArticle>;
};

export function useUserArticleTuple(
  articleIds: string[],
  userId: string
): UserArticleTuple[] | null {
  const articleEntries = useArticles(articleIds);
  const userArticleEntries = useUserArticles(articleIds, userId);

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
