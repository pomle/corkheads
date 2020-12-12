import React from "react";
import { useArticle } from "components/hooks/db/useArticles";
import PictureView from "components/views/PictureView";
import BusyView from "components/views/BusyView";
import ErrorView from "components/views/ErrorView";
import AreaButton from "components/ui/trigger/AreaButton";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";

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
  const nav = (
    <NavigationBar back={<BackButton onClick={routes.back}>Back</BackButton>} />
  );

  const article = useArticle(articleId)?.data;

  if (!article) {
    return <BusyView />;
  }

  if (!article.photoURL) {
    return <ErrorView nav={nav}>No photo</ErrorView>;
  }

  return (
    <AreaButton onClick={routes.back}>
      <PictureView photoURL={article.photoURL} />
    </AreaButton>
  );
};

export default ArticlePicturePage;
