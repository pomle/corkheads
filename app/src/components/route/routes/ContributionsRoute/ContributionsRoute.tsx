import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ArticleRoutes from "components/route/routes/ArticleRoutes";
import { ViewStack } from "@pomle/react-viewstack";
import ContributionsPage from "./pages/ContributionsPage";
import { SlideRight } from "components/ui/transitions/Slide";
import { Path, codecs } from "@pomle/paths";

interface ContributionsRouteProps {
  origin: Path<{}>;
  path: Path<{}>;
  userId: string;
}

const ContributionsRoute: React.FC<ContributionsRouteProps> = ({
  userId,
  origin,
  path,
}) => {
  const history = useHistory();

  const paths = useMemo(
    () => ({
      article: path.append("/:articleId", {
        articleId: codecs.string,
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
      <ContributionsPage routes={routes} userId={userId} />
      <Screen path={paths.article} transition={SlideRight}>
        {(match) => (
          <ArticleRoutes
            origin={path}
            path={match.path}
            articleId={match.params.articleId}
          />
        )}
      </Screen>
    </ViewStack>
  );
};

export default ContributionsRoute;
