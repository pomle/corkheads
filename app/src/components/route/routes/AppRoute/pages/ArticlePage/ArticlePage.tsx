import React, { useMemo } from "react";
import { useArticleStore } from "components/hooks/db/useArticles";
import ArticleDetailsView from "components/views/ArticleDetailsView";
import LoadingView from "components/views/LoadingView";
import ErrorView from "components/views/ErrorView";

const ArticlePage: React.FC<{ articleId: string }> = ({ articleId }) => {
  const ids = useMemo(() => [articleId], [articleId]);

  const result = useArticleStore(ids);

  const Nav = <>Placeholder</>;

  const article = result[0];

  if (!article) {
    return <LoadingView nav={Nav} />;
  }

  if (!article) {
    return <ErrorView nav={Nav}>Not found</ErrorView>;
  }

  return <ArticleDetailsView nav={Nav} article={article} />;
};

export default ArticlePage;
