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

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    textAlign: "center",
  },
  body: {
    margin: "0 16px",
  },
}));

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
  const query = useMemo((): UserCollectionArticleQuery => {
    return {
      filters: {
        userId,
      },
      order: [{ field: "addedTimestamp", dir: "desc" }],
      limit: 20,
    };
  }, [userId]);

  const request = useUserCollectionArticleQuery(query);

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
            <CollectionList>
              {request.results.map(({ articleEntry }) => {
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
          </div>
        </ViewBody>
      </HeaderLayout>
    </Themer>
  );
};

export default UserCollectionView;
