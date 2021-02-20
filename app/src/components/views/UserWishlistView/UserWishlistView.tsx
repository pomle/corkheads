import React, { useMemo } from "react";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import { useScrollSize } from "components/hooks/useScrollSize";
import { byDisplayName } from "lib/sort/article";
import ViewportDetector from "components/ui/trigger/ViewportDetector";
import { useArticles } from "components/hooks/db/useArticles";
import {
  UserArticleQuery,
  useUserArticleQuery,
} from "components/hooks/db/useUserArticleQuery";
import WishlistList from "components/fragments/Article/WishlistList";
import { Nav } from "components/ui/layout/NavigationBar";
import HeaderPageLayout from "components/ui/layout/HeaderPageLayout";

const MIN_ITEMS = 20;
const MAX_ITEMS = 100;
const INC_SIZE = 10;

interface UserWishlistViewProps {
  nav: Nav;
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
  const [size, bump] = useScrollSize(MIN_ITEMS, MAX_ITEMS, INC_SIZE);

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
    if (articles.size < request.results.length) {
      return [];
    }

    return Array.from(articles.values())
      .sort(byDisplayName)
      .map((e) => ({
        articleId: e.id,
        userId,
      }));
  }, [articles, userId, request]);

  return (
    <ThemeProvider theme="pure">
      <HeaderPageLayout nav={nav} title="Wishlist">
        <WishlistList pointers={pointers.slice(0, size)} routes={routes} />
        <ViewportDetector onEnter={bump} />
      </HeaderPageLayout>
    </ThemeProvider>
  );
};

export default UserWishlistView;
