import { useCallback, useMemo, useState } from "react";
import { createClient } from "lib/api/algolia";

export function useAlgolia() {
  return useMemo(createClient, []);
}

export function useArticleIndex() {
  const client = useAlgolia();
  return useMemo(() => client.initIndex("articles"), [client]);
}

export function useUserArticleIndex() {
  const client = useAlgolia();
  return useMemo(() => client.initIndex("user-articles"), [client]);
}

type SearchFilters = {
  userIds: string[];
};

export type ArticleSearchQuery = {
  search: {
    text: string;
  };
  filters: SearchFilters;
};

const SEARCH_TYPE_DEBOUNCE = 250;

const SEARCH_OPTIONS = {
  highlightPreTag: "[",
  highlightPostTag: "]",
};

const ARTICLE_SEARCH_OPTIONS = {
  ...SEARCH_OPTIONS,
  attributesToRetrieve: ["objectID"],
};

const USER_ARTICLE_SEARCH_OPTIONS = {
  ...SEARCH_OPTIONS,
  attributesToRetrieve: ["articleId", "userId"],
};

function encodeFilters(filters: SearchFilters) {
  return filters.userIds.map((userId) => `userId: ${userId}`).join(" OR ");
}

export function useSearch() {
  const [busy, setBusy] = useState<ArticleSearchQuery>();
  const articleIndex = useArticleIndex();
  const userArticleIndex = useUserArticleIndex();

  const performSearch = useCallback(
    async (query: ArticleSearchQuery) => {
      const searchRequests = [
        articleIndex.search(query.search.text, ARTICLE_SEARCH_OPTIONS),
      ];

      if (query.filters.userIds.length > 0) {
        searchRequests.push(
          userArticleIndex.search(query.search.text, {
            ...USER_ARTICLE_SEARCH_OPTIONS,
            filters: encodeFilters(query.filters),
          })
        );
      }

      const [articles, userArticles] = await Promise.all(searchRequests);

      return {
        articles,
        userArticles: userArticles ? userArticles : undefined,
      };
    },
    [articleIndex, userArticleIndex]
  );

  const search = useMemo(() => {
    let timer: NodeJS.Timeout;

    return (query: ArticleSearchQuery): ReturnType<typeof performSearch> => {
      clearTimeout(timer);

      setBusy(query);

      return new Promise((resolve) => {
        const execute = () => {
          performSearch(query)
            .then(resolve)
            .finally(() => {
              setBusy((state) => (state === query ? undefined : state));
            });
        };

        timer = setTimeout(execute, SEARCH_TYPE_DEBOUNCE);
      });
    };
  }, [performSearch]);

  return useMemo(
    () => ({
      busy: !!busy,
      search,
    }),
    [busy, search]
  );
}
