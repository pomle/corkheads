import React, { useMemo } from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { makeStyles } from "@material-ui/styles";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import { Theme } from "components/ui/theme/themes";
import ViewHead from "components/ui/layout/ViewHead";
import CollectionList from "components/ui/layout/CollectionList";
import ViewportDetector from "components/ui/trigger/ViewportDetector";
import { useScrollSize } from "components/hooks/useScrollSize";
import { byDisplayName } from "lib/sort/article";
import { useArticles } from "components/hooks/db/useArticles";
import CollectionArticleItemButton from "components/fragments/Article/CollectionArticleItem/Button";
import {
  UserArticleQuery,
  useUserArticleQuery,
} from "components/hooks/db/useUserArticleQuery";

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

  const query = useMemo((): UserArticleQuery => {
    return {
      filters: {
        userId,
        collection: true,
      },
      limit: MAX_ITEMS,
    };
  }, [userId]);

  const request = useUserArticleQuery(query);

  const articles = useArticles(
    request.results.map((pointer) => pointer.articleId)
  );

  const pointers = useMemo(() => {
    return Array.from(articles.values())
      .sort(byDisplayName)
      .map((entry) => ({
        articleId: entry.id,
        userId: userId,
      }));
  }, [articles, userId]);

  const classes = useStyles();

  return (
    <ThemeProvider theme="cream">
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
              {pointers.slice(0, size).map((pointer) => {
                return (
                  <CollectionArticleItemButton
                    key={pointer.articleId}
                    pointer={pointer}
                    route={routes.article}
                  />
                );
              })}
            </CollectionList>
            <ViewportDetector onEnter={bump} />
          </div>
        </ViewBody>
      </HeaderLayout>
    </ThemeProvider>
  );
};

export default UserCollectionView;
