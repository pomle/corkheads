import { useCallback, useMemo, useState } from "react";
import { createClient } from "lib/api/algolia";

export function useAlgolia() {
  return useMemo(createClient, []);
}

export function useUserIndex() {
  const client = useAlgolia();
  return useMemo(() => client.initIndex("users"), [client]);
}

export function useArticleIndex() {
  const client = useAlgolia();
  return useMemo(() => client.initIndex("articles"), [client]);
}

export function useUserArticleIndex() {
  const client = useAlgolia();
  return useMemo(() => client.initIndex("user-articles"), [client]);
}

export enum SearchArea {
  None,
  Article = 1 << 1,
  User = 1 << 2,
}

type SearchFilters = {
  userIds: string[];
};

export type SearchQuery = {
  search: {
    text: string;
  };
  areas: SearchArea;
  filters?: SearchFilters;
};

const SEARCH_TYPE_DEBOUNCE = 250;

const SEARCH_OPTIONS = {
  highlightPreTag: "[",
  highlightPostTag: "]",
};

const USER_SEARCH_OPTIONS = {
  ...SEARCH_OPTIONS,
  attributesToRetrieve: ["userId"],
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
  const [busy, setBusy] = useState<SearchQuery>();
  const userIndex = useUserIndex();
  const articleIndex = useArticleIndex();
  const userArticleIndex = useUserArticleIndex();

  const performSearch = useCallback(
    async (query: SearchQuery) => {
      const areas = query.areas;
      const text = query.search.text;

      const requests = {
        user:
          (areas & SearchArea.User) === SearchArea.User
            ? userIndex.search(text, USER_SEARCH_OPTIONS)
            : null,
        article:
          (areas & SearchArea.Article) === SearchArea.Article
            ? articleIndex.search(text, ARTICLE_SEARCH_OPTIONS)
            : null,
        userArticle:
          (areas & SearchArea.Article) === SearchArea.Article
            ? userArticleIndex.search(text, {
                ...USER_ARTICLE_SEARCH_OPTIONS,
                filters: query.filters && encodeFilters(query.filters),
              })
            : null,
      };

      return {
        articles: await requests.article,
        users: await requests.user,
        userArticles: await requests.userArticle,
      };
    },
    [userIndex, articleIndex, userArticleIndex]
  );

  const search = useMemo(() => {
    let timer: NodeJS.Timeout;

    return (query: SearchQuery): ReturnType<typeof performSearch> => {
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
