import React from "react";
import { useArticle } from "components/hooks/db/useArticles";
import LoadingView from "components/views/LoadingView";
import ErrorView from "components/views/ErrorView";
import BackButton from "components/ui/trigger/BackButton";
import PicturePage from "components/route/pages/PicturePage";
import { useRoute } from "components/route/Screen";

interface ArticlePicturePageProps {
  articleId: string;
}

const ArticlePicturePage: React.FC<ArticlePicturePageProps> = ({
  articleId,
}) => {
  const route = useRoute();

  const article = useArticle(articleId)?.data;

  const nav = { back: <BackButton onClick={route.back} /> };

  if (!article) {
    return <LoadingView nav={nav} />;
  }

  const imageId = article?.imageId;

  if (!imageId) {
    return <ErrorView nav={nav}>No photo</ErrorView>;
  }

  return <PicturePage imageId={imageId} />;
};

export default ArticlePicturePage;
