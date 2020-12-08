import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import ArticleDetailsView from "components/views/ArticleDetailsView";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import * as paths from "components/route/paths";
import { useUser } from "components/hooks/useUser";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import LoadingView from "components/views/LoadingView";

interface ArticlePageProps {
  articleId: string;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ articleId }) => {
  const history = useHistory();

  const goToProfile = useCallback(() => {
    const url = paths.profileView.url({});
    history.push(url);
  }, [history]);

  const user = useUser();

  const nav = (
    <NavigationBar
      back={<BackButton onClick={goToProfile}>Profile</BackButton>}
    />
  );

  const routes = useMemo(
    () => ({
      picture: () => {
        const url = paths.articlePicture.url({ articleId });
        history.push(url);
      },
      createCheckIn: () => {
        const url = paths.articleCheckIn.url({ articleId });
        history.push(url);
      },
      checkIn: (checkInId: string) => {
        const url = paths.checkInView.url({ checkInId });
        history.push(url);
      },
    }),
    [history, articleId]
  );

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        if (!user) {
          return <LoadingView nav={nav} />;
        }

        return (
          <ArticleDetailsView
            nav={nav}
            routes={routes}
            userId={user.uid}
            articleId={articleId}
          />
        );
      }}
    </ErrorBoundary>
  );
};

export default ArticlePage;
