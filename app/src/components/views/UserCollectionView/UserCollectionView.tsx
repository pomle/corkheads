import React, { useMemo } from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { makeStyles } from "@material-ui/styles";
import Themer from "components/ui/theme/Themer";
import { Theme } from "components/ui/theme/themes";
import ViewHead from "components/ui/layout/ViewHead";
import CollectionList from "components/ui/layout/CollectionList";
import CollectionArticleItem from "components/fragments/Article/CollectionArticleItem";
import {
  UserCollectionArticleQuery,
  useUserCollectionArticleQuery,
} from "components/hooks/db/useUserCollectionArticleQuery";
import ViewportDetector from "components/ui/trigger/ViewportDetector";
import { useScrollSize } from "components/hooks/useScrollSize";
import { useContentCache } from "components/hooks/useContentCache";
import { byDisplayName } from "lib/sort/userArticleTuple";

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    textAlign: "center",
  },
  body: {
    margin: "0 16px",
  },
}));

const MAX_ITEMS = 100;

interface UserCollectionViewProps {
  nav: React.ReactNode;
  routes: {
    article: (articleId: string) => void;
  };
  userId: string;
}

const UserCollectionView: React.FC<UserCollectionViewProps> = ({
  nav,
  routes,
  userId,
}) => {
  const [size, bump] = useScrollSize(6, MAX_ITEMS, 6);

  const query = useMemo((): UserCollectionArticleQuery => {
    return {
      filters: {
        userId,
      },
      order: [{ field: "addedTimestamp", dir: "desc" }],
      limit: MAX_ITEMS,
    };
  }, [userId]);

  const request = useUserCollectionArticleQuery(query);

  const items = useMemo(() => {
    return Array.from(request.results.values())
      .slice(0, size)
      .sort(byDisplayName);
  }, [size, request]);

  const classes = useStyles();

  return (
    <Themer theme="cream">
      <HeaderLayout>
        <ViewCap>
          {nav}
          <ViewHead>
            <div className={classes.head}>
              <h1>Collection</h1>
            </div>
          </ViewHead>
        </ViewCap>
        <ViewBody>
          <div className={classes.body}>
            {useContentCache(() => {
              if (request.busy) {
                return;
              }

              return (
                <CollectionList>
                  {items.map(({ articleEntry }) => {
                    const article = articleEntry.data;

                    return (
                      <button
                        key={articleEntry.id}
                        onClick={() => routes.article(articleEntry.id)}
                      >
                        {article && <CollectionArticleItem article={article} />}
                      </button>
                    );
                  })}
                </CollectionList>
              );
            }, [items, request])}
            <ViewportDetector onEnter={bump} />
          </div>
        </ViewBody>
      </HeaderLayout>
    </Themer>
  );
};

export default UserCollectionView;
