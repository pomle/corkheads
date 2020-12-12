import { useMemo, useState } from "react";
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

export function useSearch() {
  const [busy, setBusy] = useState<string>();
  const searchIndex = useArticleIndex();

  const search = useMemo(() => {
    let timer: NodeJS.Timeout;

    return (query: string): ReturnType<typeof searchIndex.search> => {
      clearTimeout(timer);

      setBusy(query);

      return new Promise((resolve) => {
        const execute = () => {
          searchIndex
            .search(query, {
              attributesToRetrieve: ["objectID"],
              highlightPreTag: "[",
              highlightPostTag: "]",
            })
            .then((results) => {
              resolve(results);
            })
            .finally(() => {
              setBusy((state) => (state === query ? undefined : state));
            });
        };

        timer = setTimeout(execute, SEARCH_TYPE_DEBOUNCE);
      });
    };
  }, [searchIndex]);

  return useMemo(
    () => ({
      busy: !!busy,
      search,
    }),
    [busy, search]
  );
}
