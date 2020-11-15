import { useMemo } from "react";
import {
  createStoreHook,
  useFlatResult,
} from "components/hooks/createStoreHook";
import { converter, UserArticle } from "types/userArticle";
import { useDB } from "components/hooks/useDB";

export function useUserArticleCollection(userId: string) {
  const db = useDB();
  return useMemo(
    () =>
      db
        .collection("users")
        .doc(userId)
        .collection("articles")
        .withConverter(converter),
    [db, userId]
  );
}

export function useUserArticleStore(userId: string, articleIds: string[]) {
  const collection = useUserArticleCollection(userId);

  const useStore = useMemo(() => {
    return createStoreHook<UserArticle>(() => collection);
  }, [collection]);

  return useStore(articleIds);
}

export function useUserArticle(userId: string, articleId: string) {
  const result = useUserArticleStore(userId, [articleId]);
  return useFlatResult(articleId, result);
}
