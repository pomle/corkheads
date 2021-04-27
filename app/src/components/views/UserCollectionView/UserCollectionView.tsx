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
import { useBack, useScreen } from "components/context/ScreenContext";
import BackButton from "components/ui/trigger/BackButton";
import { stringCodec } from "components/route/codecs";
import ArticleDetailsView from "../ArticleDetailsView";
import { SlideRight } from "components/ui/transitions/Slide";

const MIN_ITEMS = 10;
const MAX_ITEMS = 100;
const INC_SIZE = 10;

interface UserCollectionViewProps {
  userId: string;
}

const UserCollectionView: React.FC<UserCollectionViewProps> = ({ userId }) => {
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
      <HeaderPageLayout
        nav={{ back: <BackButton onClick={goBack} /> }}
        title="Collection"
      >
        <CollectionArticleList
          pointers={pointers.slice(0, size)}
          toArticle={(articleId) => goToArticle({ articleId })}
        />
        <ViewportDetector onEnter={bump} />
      </HeaderPageLayout>
    </ThemeProvider>
  );
};

export default UserCollectionView;
