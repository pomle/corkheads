import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import ArticleEditView from "components/views/ArticleEditView";
import { Article } from "types/article";
import LoadingView from "components/views/LoadingView";
import { useUser } from "components/hooks/useUser";

function createDefaultArticle(): Article {
  return {
    id: "",
    data: {
      displayName: "",
      manufacturer: "",
    },
  };
}

const ArticleCreatePage: React.FC = () => {
  const history = useHistory();

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const nav = (
    <NavigationBar back={<BackButton onClick={goBack}>Back</BackButton>} />
  );

  const user = useUser();

  const article = useMemo(createDefaultArticle, []);

  if (!user) {
    return <LoadingView nav={nav} />;
  }

  return (
    <ArticleEditView
      key={history.location.key}
      nav={nav}
      user={user}
      article={article}
    />
  );
};

export default ArticleCreatePage;