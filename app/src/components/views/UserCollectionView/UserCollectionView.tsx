import React, { useMemo } from "react";
import { Nav } from "components/ui/layout/NavigationBar";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import ViewportDetector from "components/ui/trigger/ViewportDetector";
import { useScrollSize } from "components/hooks/useScrollSize";
import { byDisplayName } from "lib/sort/article";
import { useArticles } from "components/hooks/db/useArticles";
import CollectionArticleList from "components/fragments/Article/CollectionArticleList";
import {
  UserArticleQuery,
  useUserArticleQuery,
} from "components/hooks/db/useUserArticleQuery";
import HeaderPageLayout from "components/ui/layout/HeaderPageLayout";

const MIN_ITEMS = 10;
const MAX_ITEMS = 100;
const INC_SIZE = 10;

interface UserCollectionViewProps {
  nav: Nav;
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

  return (
    <ThemeProvider theme="pure">
      <HeaderPageLayout nav={nav} title="Collection">
        <CollectionArticleList
          pointers={pointers.slice(0, size)}
          routes={routes}
        />
        <ViewportDetector onEnter={bump} />
      </HeaderPageLayout>
    </ThemeProvider>
  );
};

export default UserCollectionView;
