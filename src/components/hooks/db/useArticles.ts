import { useEffect, useMemo, useState } from "react";
import { articleConverter } from "types/adapters";
import { Article } from "types/types";
import { useDB } from "../useDB";

type QueryResult<T> = {
    busy: boolean,
    data?: firebase.firestore.QuerySnapshot<T>,
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

    const collection = useMemo(() => {
        return db.collection("articles").withConverter(articleConverter);
    }, [db]);

    useEffect(() => {
        if (query.search) {
            setResult(result => ({...result, busy: true}))

            collection
                .where("displayName", "==", query.search.text)
                .get()
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
    }, [collection, query])

    return result;
}
