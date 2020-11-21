import React, { useCallback } from "react";
import { useArticle } from "components/hooks/db/useArticles";
import LoadingView from "components/views/LoadingView";
import CheckInCreateView from "components/views/CheckInCreateView";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import * as paths from "components/route/paths";
import { useHistory } from "react-router-dom";
import { useUser } from "components/hooks/useUser";
import ErrorView from "components/views/ErrorView";

interface CheckInCreatePageProps {
  articleId: string;
}

const CheckInCreatePage: React.FC<CheckInCreatePageProps> = ({ articleId }) => {
  const history = useHistory();

  const goToArticle = useCallback(() => {
    const url = paths.articleView.url({ articleId });
    history.push(url);
  }, [articleId, history]);

  const goToProfile = useCallback(() => {
    const url = paths.profileView.url({});
    history.push(url);
  }, [history]);

  const result = useArticle(articleId);
  const article = result.data;

  const nav = (
    <NavigationBar
      back={
        <BackButton onClick={goToArticle}>
          {article ? article.data.displayName : "Article"}
        </BackButton>
      }
    />
  );

  const user = useUser();

  if (result.busy || !user) {
    return <LoadingView nav={nav} />;
  }

  if (!article) {
    return <ErrorView nav={nav}>Not found</ErrorView>;
  }

  return (
    <CheckInCreateView
      key={history.location.key}
      nav={nav}
      article={article.data}
      user={user}
      onSuccess={goToProfile}
    />
  );
};

export default CheckInCreatePage;
