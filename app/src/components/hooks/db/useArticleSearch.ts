import { useState, useEffect, useMemo, useRef } from "react";
import { Article } from "types/Article";
import { Entry } from "types/Entry";
import { useArticles } from "./useArticles";
import { useArticleIndex } from "../algolia";

export type ArticleSearchQuery = {
  search: {
    text: string;
  };
};

export function useArticleSearch(
  query: ArticleSearchQuery
): Entry<Article>[] | null {
  const [ids, setIds] = useState<string[]>([]);
  const searchIndex = useArticleIndex();
  const list = useRef<Entry<Article>[]>([]);

  useEffect(() => {
    searchIndex
      .search(query.search.text)
      .then((results) => {
        return results.hits.map((hit) => hit.objectID);
      })
      .then(setIds);
  }, [setIds, searchIndex, query]);

  const articlesResult = useArticles(ids);

  return useMemo(() => {
    if (!articlesResult) {
      return null;
    }

    const newList: Entry<Article>[] = [];

    let updateList = list.current.length !== ids.length;
    for (let index = 0; index < ids.length; index += 1) {
      const id = ids[index];
      const entry = articlesResult[id];
      if (entry) {
        newList.push(entry);
        if (newList[index] !== list.current[index]) {
          updateList = true;
        }
      }
    }

    if (updateList) {
      list.current = newList;
    }

    return list.current;
  }, [ids, articlesResult]);
}
