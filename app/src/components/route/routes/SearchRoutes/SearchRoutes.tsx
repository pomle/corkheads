import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ArticleRoutes from "components/route/routes/ArticleRoutes";
import UserRoutes from "components/route/routes/UserRoutes";
import ViewStack from "components/ui/layout/ViewStack";
import FindPage from "./pages/FindPage";
import ArticleCreatePage from "./pages/ArticleCreatePage";
import { SlideDown, SlideRight } from "components/ui/transitions/Slide";
import { Path, codecs } from "@pomle/paths";

interface SearchRoutesProps {
  origin: Path<{}>;
  path: Path<{}>;
  userId: string;
}

const SearchRoutes: React.FC<SearchRoutesProps> = ({
  userId,
  origin,
  path,
}) => {
  const history = useHistory();

  const paths = useMemo(
    () => ({
      article: path.append("/article/:articleId", {
        articleId: codecs.string,
      }),
      user: path.append("/user/:userId", {
        userId: codecs.string,
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
        history.push(url);
      },
      user(userId: string) {
        const url = paths.user.url({ userId });
        history.push(url);
      },
      createArticle() {
        const url = paths.createArticle.url({});
        history.push(url);
      },
    }),
    [path, paths, origin, history]
  );

  const findPageRoutes = useMemo(
    () => ({
      cancel: routes.parent,
      article: routes.article,
      user: routes.user,
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
      <Screen path={paths.user} transition={SlideRight}>
        {(match) => (
          <UserRoutes
            origin={path}
            path={match.path}
            userId={match.params.userId}
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

export default SearchRoutes;
