import React, { useMemo } from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { makeStyles } from "@material-ui/styles";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import { Theme } from "components/ui/theme/themes";
import ViewHead from "components/ui/layout/ViewHead";
import ViewportDetector from "components/ui/trigger/ViewportDetector";
import { useScrollSize } from "components/hooks/useScrollSize";
import { byDisplayName } from "lib/sort/article";
import { useArticles } from "components/hooks/db/useArticles";
import CollectionArticleList from "components/fragments/Article/CollectionArticleList";
import {
  UserArticleQuery,
  useUserArticleQuery,
} from "components/hooks/db/useUserArticleQuery";

const useStyles = makeStyles((theme: Theme) => ({
  body: {
    margin: "16px",
  },
}));

const MIN_ITEMS = 10;
const MAX_ITEMS = 100;
const INC_SIZE = 10;

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
  const [size, bump] = useScrollSize(MIN_ITEMS, MAX_ITEMS, INC_SIZE);

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
    if (articles.size < request.results.length) {
      return [];
    }

    return Array.from(articles.values())
      .sort(byDisplayName)
      .map((entry) => ({
        articleId: entry.id,
        userId: userId,
      }));
  }, [articles, userId, request]);

  const classes = useStyles();

  return (
    <ThemeProvider theme="pure">
      <HeaderLayout>
        <ViewCap>
          {nav}
          <ViewHead>
            <h1>Collection</h1>
          </ViewHead>
        </ViewCap>
        <ViewBody>
          <div className={classes.body}>
            <CollectionArticleList
              pointers={pointers.slice(0, size)}
              routes={routes}
            />
            <ViewportDetector onEnter={bump} />
          </div>
        </ViewBody>
      </HeaderLayout>
    </ThemeProvider>
  );
};

export default UserCollectionView;
