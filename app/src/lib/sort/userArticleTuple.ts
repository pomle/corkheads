import { UserArticleTuple } from "components/hooks/db/useUserArticles";

export function byDisplayName(a: UserArticleTuple, b: UserArticleTuple) {
  const aText = a.articleEntry.data?.displayName;
  const bText = b.articleEntry.data?.displayName;
  if (!aText || !bText || aText < bText) {
    return -1;
  }
  return 1;
}
