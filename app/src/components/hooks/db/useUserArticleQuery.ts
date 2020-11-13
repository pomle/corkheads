import { useEffect, useMemo, useState } from "react";
import { useDB } from "../useDB";
import { toList } from "../createStoreHook";
import { useArticleStore } from "./useArticles";

type UserArticleQuery = {
  filters: {
    userId: string;
  };
  limit: number;
};

export function useUserArticleQuery(query: UserArticleQuery) {
  const [busy, setBusy] = useState<boolean>(true);
  const [ids, setIds] = useState<string[]>([]);

  const db = useDB();

  useEffect(() => {
    const userId = query.filters.userId;

    return db
      .collection("users")
      .doc(userId)
      .collection("articles")
      .orderBy("checkIns", "desc")
      .limit(query.limit)
      .onSnapshot((result) => {
        const ids = result.docs.map((doc) => doc.id);
        setIds(ids);
        setBusy(false);
      });
  }, [db, query]);

  const storeResult = useArticleStore(ids);

  const list = useMemo(() => toList(ids, storeResult.data), [
    ids,
    storeResult.data,
  ]);

  return useMemo(
    () => ({
      busy: busy || storeResult.busy,
      data: list,
    }),
    [storeResult.busy, list, busy]
  );
}
