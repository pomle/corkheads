import React from "react";
import { useArticle } from "components/hooks/db/useArticles";
import LoadingView from "components/views/LoadingView";
import ErrorView from "components/views/ErrorView";
import BackButton from "components/ui/trigger/BackButton";
import PicturePage from "components/route/pages/PicturePage";
import { useBack } from "components/context/ScreenContext";

interface ArticlePicturePageProps {
  articleId: string;
}

const ArticlePicturePage: React.FC<ArticlePicturePageProps> = ({
  articleId,
}) => {
  const article = useArticle(articleId)?.data;

  const goBack = useBack();

  const nav = { back: <BackButton onClick={goBack} /> };

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
