import { useMemo } from "react";
import { getPreferredBottling } from "lib/patch";
import { Article, createArticle } from "types/Article";
import { createUserArticle, UserArticle } from "types/UserArticle";
import { useArticle } from "./useArticles";
import { useUserArticle } from "./useUserArticles";

type VirtualArticle = Article & UserArticle;

export function useUserVirtualArticle(
  userId: string,
  articleId?: string
): VirtualArticle {
  const article = useArticle(articleId)?.data || createArticle("404");
  const userArticle =
    useUserArticle(userId, articleId)?.data || createUserArticle("404");

  return useMemo(() => {
    return {
      ...article,
      ...userArticle,
      bottling: getPreferredBottling(article, userArticle),
    };
  }, [article, userArticle]);
}
