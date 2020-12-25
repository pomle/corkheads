import { Article } from "types/Article";
import { Entry } from "types/Entry";
import { UserArticle } from "types/UserArticle";

type Item = Entry<Article | UserArticle>;

export function byDisplayName(a: Item, b: Item) {
  const aText = a.data?.displayName;
  const bText = b.data?.displayName;
  if (!aText || !bText || aText < bText) {
    return -1;
  }
  return 1;
}
