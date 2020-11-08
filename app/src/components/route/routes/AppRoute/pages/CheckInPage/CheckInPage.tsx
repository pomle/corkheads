import React, { useCallback, useMemo } from "react";
import { useArticleStore } from "components/hooks/db/useArticles";
import LoadingView from "components/views/LoadingView";
import ErrorView from "components/views/ErrorView";
import CheckInView from "components/views/CheckInView";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import * as paths from "components/route/paths";
import { useHistory } from "react-router-dom";

const CheckInPage: React.FC<{ articleId: string }> = ({ articleId }) => {
  const history = useHistory();

  const goToArticle = useCallback(() => {
    const url = paths.articleView.url({ articleId });
    console.log(url);
    history.push(url);
  }, [articleId, history]);

  const ids = useMemo(() => [articleId], [articleId]);

  const result = useArticleStore(ids);

  const nav = (
    <NavigationBar
      back={<BackButton onClick={goToArticle}>Article</BackButton>}
    />
  );

  const article = result[0];

  if (!article) {
    return <LoadingView nav={nav} />;
  }

  if (!article) {
    return <ErrorView nav={nav}>Not found</ErrorView>;
  }

  return <CheckInView nav={nav} article={article} />;
};

export default CheckInPage;
