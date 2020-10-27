import { useEffect, useMemo, useState } from "react";
import { articleConverter } from "types/adapters";
import { Article } from "types/types";
import { useArticleIndex } from "components/hooks/algolia";
import { useDB } from "../useDB";

type QueryResult<T> = {
    busy: boolean,
    data?: T[],
}

type ArticlesQuery = {
    search?: {
        text: string
    },
};

export function useArticles(query: ArticlesQuery) {
    const [result, setResult] = useState<QueryResult<Article>>({
        busy: false,
    });

    const db = useDB();

    const searchIndex = useArticleIndex();

    const collection = useMemo(() => {
        return db.collection("articles").withConverter(articleConverter);
    }, [db]);

    useEffect(() => {
        if (query.search) {
            setResult(result => ({...result, busy: true}))

            searchIndex
            .search(query.search.text)
            .then(results => {
                return results.hits.map(hit => hit.objectID);
            })
            .then(ids => {
                return ids.map(id => collection.doc(id).get());
            })
            .then(results => Promise.all(results))
            .then(snapshots => {
                return snapshots.filter(s => s.exists).map(s => s.data()) as Article[];
            })
            .then(snapshots => {
                setResult(result => ({
                    ...result,
                    data: snapshots
                }));
            })
            .finally(() => {
                setResult(result => ({...result, busy: false}));
            });
        }
    }, [collection, searchIndex, query])

    return result;
}
