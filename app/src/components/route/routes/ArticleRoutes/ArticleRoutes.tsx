import React from "react";
import ArticlePage from "./pages/ArticlePage";
import { Path } from "lib/path";
import { ScreenContext } from "components/context/ScreenContext";

interface ArticleRoutesProps {
  origin: Path<{}>;
  path: Path<{}>;
  articleId: string;
}

const ArticleRoutes: React.FC<ArticleRoutesProps> = ({
  articleId,
  path,
  origin,
}) => {
  return (
    <ScreenContext originPath={origin} mountPath={path}>
      <ArticlePage articleId={articleId} />
    </ScreenContext>
  );
};

export default ArticleRoutes;
