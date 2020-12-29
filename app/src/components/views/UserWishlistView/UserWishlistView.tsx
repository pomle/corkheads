import React, { useMemo } from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { makeStyles } from "@material-ui/styles";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import { Theme } from "components/ui/theme/themes";
import ViewHead from "components/ui/layout/ViewHead";
import { useScrollSize } from "components/hooks/useScrollSize";
import { byDisplayName } from "lib/sort/article";
import ViewportDetector from "components/ui/trigger/ViewportDetector";
import { useArticles } from "components/hooks/db/useArticles";
import {
  UserArticleQuery,
  useUserArticleQuery,
} from "components/hooks/db/useUserArticleQuery";
import WishlistList from "components/fragments/Article/WishlistList";

const useStyles = makeStyles((theme: Theme) => ({
  body: {
    margin: "24px",
  },
}));

const MAX_ITEMS = 100;

interface UserWishlistViewProps {
  nav: React.ReactNode;
  routes: {
    article: (articleId: string) => void;
  };
  userId: string;
}

const UserWishlistView: React.FC<UserWishlistViewProps> = ({
  nav,
  routes,
  userId,
}) => {
  const [size, bump] = useScrollSize(6, MAX_ITEMS, 6);

  const query = useMemo((): UserArticleQuery => {
    return {
      filters: {
        userId,
        wishlist: true,
      },
      limit: MAX_ITEMS,
    };
  }, [userId]);

  const request = useUserArticleQuery(query);

  const articles = useArticles(request.results.map((p) => p.articleId));

  const pointers = useMemo(() => {
    return Array.from(articles.values())
      .sort(byDisplayName)
      .map((e) => ({
        articleId: e.id,
        userId,
      }));
  }, [articles, userId]);

  const classes = useStyles();

  return (
    <ThemeProvider theme="pure">
      <HeaderLayout>
        <ViewCap>
          {nav}
          <ViewHead>
            <h1>Wishlist</h1>
          </ViewHead>
        </ViewCap>
        <ViewBody>
          <div className={classes.body}>
            <WishlistList pointers={pointers.slice(0, size)} routes={routes} />
            <ViewportDetector onEnter={bump} />
          </div>
        </ViewBody>
      </HeaderLayout>
    </ThemeProvider>
  );
};

export default UserWishlistView;
