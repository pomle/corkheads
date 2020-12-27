import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ArticleRoutes from "components/route/routes/ArticleRoutes";
import ViewStack from "components/ui/layout/ViewStack";
import FindPage from "./pages/FindPage";
import { SlideDown, SlideRight } from "components/ui/transitions/Slide";
import { Path } from "lib/path";
import { stringCodec } from "components/route/codecs";
import ArticleCreatePage from "components/route/pages/ArticleCreatePage";

interface SearchArticleRoutesProps {
  origin: Path<{}>;
  path: Path<{}>;
  userId: string;
}

const SearchArticleRoutes: React.FC<SearchArticleRoutesProps> = ({
  userId,
  origin,
  path,
}) => {
  const history = useHistory();

  const paths = useMemo(
    () => ({
      article: path.append("/article/:articleId", {
        articleId: stringCodec,
      }),
      createArticle: path.append("/create-article", {}),
    }),
    [path]
  );

  const routes = useMemo(
    () => ({
      parent() {
        const url = origin.url({});
        history.push(url);
      },
      here() {
        const url = path.url({});
        history.push(url);
      },
      article(articleId: string) {
        const url = paths.article.url({ articleId });
        history.replace(url);
      },
      createArticle() {
        const url = paths.createArticle.url({});
        return url;
      },
    }),
    [path, paths, origin, history]
  );

  const findPageRoutes = useMemo(
    () => ({
      cancel: routes.parent,
      article: routes.article,
      createArticle: routes.createArticle,
    }),
    [routes]
  );

  const createArticlePageRoutes = useMemo(
    () => ({
      cancel: routes.here,
      article: routes.article,
    }),
    [routes]
  );

  return (
    <ViewStack>
      <FindPage routes={findPageRoutes} />
      <Screen path={paths.article} transition={SlideRight}>
        {(match) => (
          <ArticleRoutes
            origin={path}
            path={match.path}
            articleId={match.params.articleId}
          />
        )}
      </Screen>
      <Screen path={paths.createArticle} transition={SlideDown}>
        {() => (
          <ArticleCreatePage routes={createArticlePageRoutes} userId={userId} />
        )}
      </Screen>
    </ViewStack>
  );
};

export default SearchArticleRoutes;
