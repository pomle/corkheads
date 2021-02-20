import React from "react";
import { useHistory } from "react-router-dom";
import CancelButton from "components/ui/trigger/CancelButton";
import ArticleEditView from "components/views/ArticleEditView";

interface ArticleCreatePageProps {
  userId: string;
  routes: {
    cancel: () => void;
    article: (articleId: string) => void;
  };
}

const ArticleCreatePage: React.FC<ArticleCreatePageProps> = ({
  userId,
  routes,
}) => {
  const history = useHistory();

  const nav = {
    back: <CancelButton onClick={routes.cancel}>Cancel</CancelButton>,
  };

  return (
    <ArticleEditView
      key={history.location.key}
      nav={nav}
      routes={routes}
      userId={userId}
    />
  );
};

export default ArticleCreatePage;
