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
import HeaderPageLayout from "components/ui/layout/HeaderPageLayout";
import BackButton from "components/ui/trigger/BackButton";
import { useBack, useScreen } from "components/context/ScreenContext";
import ArticleDetailsView from "../ArticleDetailsView";
import { stringCodec } from "components/route/codecs";
import { SlideRight } from "components/ui/transitions/Slide";

const MIN_ITEMS = 20;
const MAX_ITEMS = 100;
const INC_SIZE = 10;

interface UserWishlistViewProps {
  userId: string;
}

const UserWishlistView: React.FC<UserWishlistViewProps> = ({ userId }) => {
  const goBack = useBack();

  const goToArticle = useScreen({
    path: (path) => path.append("/:articleId", { articleId: stringCodec }),
    render: ({ articleId }) => (
      <ArticleDetailsView userId={userId} articleId={articleId} />
    ),
    transition: SlideRight,
  });

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
      <HeaderPageLayout
        nav={{ back: <BackButton onClick={goBack} /> }}
        title="Wishlist"
      >
        <WishlistList
          pointers={pointers.slice(0, size)}
          toArticle={(articleId) => goToArticle({ articleId })}
        />
        <ViewportDetector onEnter={bump} />
      </HeaderPageLayout>
    </ThemeProvider>
  );
};

export default UserWishlistView;
