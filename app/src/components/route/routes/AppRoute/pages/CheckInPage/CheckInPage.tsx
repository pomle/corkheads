import React, { useMemo } from "react";
import { useArticleStore } from "components/hooks/db/useArticles";
import LoadingView from "components/views/LoadingView";
import ErrorView from "components/views/ErrorView";
import CheckInView from "components/views/CheckInView";

const CheckInPage: React.FC<{ articleId: string }> = ({ articleId }) => {
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

  return <CheckInView nav={Nav} article={article} />;
};

export default CheckInPage;
