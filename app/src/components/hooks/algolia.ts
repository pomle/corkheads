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

const SEARCH_TYPE_DEBOUNCE = 250;

const SEARCH_OPTIONS = {
  attributesToRetrieve: ["objectID"],
  highlightPreTag: "[",
  highlightPostTag: "]",
};

export function useSearch() {
  const [busy, setBusy] = useState<string>();
  const articleIndex = useArticleIndex();
  const userArticleIndex = useUserArticleIndex();

  const performSearch = useCallback(
    async (query: string) => {
      const articleRequest = articleIndex.search(query, SEARCH_OPTIONS);
      const userArticleRequest = userArticleIndex.search(query, SEARCH_OPTIONS);

      return {
        articles: await articleRequest,
        userArticles: await userArticleRequest,
      };
    },
    [articleIndex, userArticleIndex]
  );

  const search = useMemo(() => {
    let timer: NodeJS.Timeout;

    return (query: string): ReturnType<typeof performSearch> => {
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
