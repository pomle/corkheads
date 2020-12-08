import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useArticle } from "components/hooks/db/useArticles";
import PictureView from "components/views/PictureView";
import BusyView from "components/views/BusyView";
import ErrorView from "components/views/ErrorView";
import AreaButton from "components/ui/trigger/AreaButton";
import * as paths from "components/route/paths";

interface ArticlePicturePageProps {
  articleId: string;
}

const ArticlePicturePage: React.FC<ArticlePicturePageProps> = ({
  articleId,
}) => {
  const history = useHistory();

  const goToArticle = useCallback(() => {
    const url = paths.articleView.url({ articleId });
    history.push(url);
  }, [history, articleId]);

  const article = useArticle(articleId)?.data;

  if (!article) {
    return <BusyView />;
  }

  if (!article.photoURL) {
    return <ErrorView nav={null}>No photo</ErrorView>;
  }

  return (
    <AreaButton onClick={goToArticle}>
      <PictureView photoURL={article.photoURL} />
    </AreaButton>
  );
};

export default ArticlePicturePage;
