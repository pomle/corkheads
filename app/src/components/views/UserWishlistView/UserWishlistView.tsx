import React, { useMemo } from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { makeStyles } from "@material-ui/styles";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import { Theme } from "components/ui/theme/themes";
import ViewHead from "components/ui/layout/ViewHead";
import ItemList from "components/ui/layout/ItemList";
import { useScrollSize } from "components/hooks/useScrollSize";
import { byDisplayName } from "lib/sort/article";
import ViewportDetector from "components/ui/trigger/ViewportDetector";
import { useArticles } from "components/hooks/db/useArticles";
import WishlistArticleItemButton from "components/fragments/Article/WishlistArticleItem/Button";
import {
  UserArticleQuery,
  useUserArticleQuery,
} from "components/hooks/db/useUserArticleQuery";

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
      }));
  }, [articles]);

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
            <ThemeProvider theme="sky">
              <ItemList>
                {pointers.slice(0, size).map((pointer) => {
                  return (
                    <WishlistArticleItemButton
                      key={pointer.articleId}
                      pointer={pointer}
                      route={routes.article}
                    />
                  );
                })}
              </ItemList>
              <ViewportDetector onEnter={bump} />
            </ThemeProvider>
          </div>
        </ViewBody>
      </HeaderLayout>
    </ThemeProvider>
  );
};

export default UserWishlistView;
