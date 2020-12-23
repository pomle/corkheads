import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ArticleRoutes from "components/route/routes/ArticleRoutes";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import ToplistPage from "./pages/ToplistPage";
import { Path } from "lib/path";
import { stringCodec } from "components/route/codecs";

interface ToplistRouteProps {
  origin: Path<{}>;
  path: Path<{}>;
  userId: string;
}

const ToplistRoute: React.FC<ToplistRouteProps> = ({
  userId,
  origin,
  path,
}) => {
  const history = useHistory();

  const paths = useMemo(
    () => ({
      article: path.append("/:articleId", {
        articleId: stringCodec,
      }),
    }),
    [path]
  );

  const routes = useMemo(
    () => ({
      back: () => {
        const url = origin.url({});
        history.push(url);
      },
      article: (articleId: string) => {
        const url = paths.article.url({ articleId });
        history.push(url);
      },
    }),
    [origin, paths, history]
  );

  return (
    <ViewStack>
      <ToplistPage routes={routes} userId={userId} />
      <Screen path={paths.article} transition={SlideRight}>
        {(match) => (
          <ArticleRoutes
            origin={path}
            path={match.path}
            userId={userId}
            articleId={match.params.articleId}
          />
        )}
      </Screen>
    </ViewStack>
  );
};

export default ToplistRoute;