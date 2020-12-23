import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import NavigationBar from "components/ui/layout/NavigationBar";
import CancelButton from "components/ui/trigger/CancelButton";
import ArticleEditView from "components/views/ArticleEditView";
import { Article } from "types/Article";
import { createBottling } from "types/Bottling";

function createDefaultArticle(): Article {
  return {
    id: "",
    displayName: "",
    bottling: createBottling(),
  };
}

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

  const nav = (
    <NavigationBar
      back={<CancelButton onClick={routes.cancel}>Cancel</CancelButton>}
    />
  );

  const article: Article = useMemo(() => {
    return {
      ...createDefaultArticle(),
      userId,
    };
  }, [userId]);

  return (
    <ArticleEditView
      key={history.location.key}
      nav={nav}
      routes={routes}
      article={article}
    />
  );
};

export default ArticleCreatePage;
