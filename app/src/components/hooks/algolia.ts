import { useMemo } from "react";
import { createClient } from "lib/api/algolia";

export function useAlgolia() {
    return useMemo(createClient, []);
}

export function useArticleIndex() {
    const client = useAlgolia();
    return useMemo(() => client.initIndex("articles"), [client]);
}
