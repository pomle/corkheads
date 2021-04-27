import React from "react";
import ArticleDetailsView from "components/views/ArticleDetailsView";
import BackButton from "components/ui/trigger/BackButton";
import { useMe } from "components/hooks/useMe";
import LoadingView from "components/views/LoadingView";
import { useBack } from "components/context/ScreenContext";

interface ArticlePageProps {
  articleId: string;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ articleId }) => {
  const user = useMe();

  const goBack = useBack();

  const nav = { back: <BackButton onClick={goBack}>Back</BackButton> };

  if (!user) {
    return <LoadingView nav={nav} />;
  }

  return (
    <ArticleDetailsView
      key={articleId}
      userId={user.id}
      articleId={articleId}
    />
  );
};

export default ArticlePage;
