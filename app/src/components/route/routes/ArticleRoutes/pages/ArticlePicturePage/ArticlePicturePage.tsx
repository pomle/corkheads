import React from "react";
import { useArticle } from "components/hooks/db/useArticles";
import LoadingView from "components/views/LoadingView";
import ErrorView from "components/views/ErrorView";
import BackButton from "components/ui/trigger/BackButton";
import PicturePage from "components/route/pages/PicturePage";

interface ArticlePicturePageProps {
  articleId: string;
  routes: {
    back: () => void;
  };
}

const ArticlePicturePage: React.FC<ArticlePicturePageProps> = ({
  articleId,
  routes,
}) => {
  const article = useArticle(articleId)?.data;

  const nav = {
    back: <BackButton onClick={routes.back}>Back</BackButton>,
  };

  if (!article) {
    return <LoadingView nav={nav} />;
  }

  const imageId = article?.imageId;

  if (!imageId) {
    return <ErrorView nav={nav}>No photo</ErrorView>;
  }

  return <PicturePage routes={routes} imageId={imageId} />;
};

export default ArticlePicturePage;
