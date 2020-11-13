import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useCheckInSearch } from "components/hooks/db/useCheckIns";
import ViewBody from "components/ui/layout/ViewBody";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";
import Section from "components/ui/layout/Section";
import SectionList from "components/ui/layout/SectionList";
import * as paths from "components/route/paths";
import ProfileHead from "./components/ProfileHead";
import { useArticleStore } from "components/hooks/db/useArticles";
import CheckInItem from "./components/CheckInItem";
import ItemList from "components/ui/layout/ItemList";
import { useUserArticleQuery } from "components/hooks/db/useUserArticleQuery";
import ArticleItem from "../ExploreArticlesView/components/ArticleItem/ArticleItem";
import { Article } from "types/types";

interface ProfileViewProps {
  nav: React.ReactNode;
  user: firebase.User;
}

function createFakeArticles(len: number) {
  const articles: Article[] = [];
  for (let i = 0; i < len; i += 1) {
    const article: Article = {
      id: `${i}`,
      data: {
        displayName: "-",
        manufacturer: "-",
      },
    };
    articles.push(article);
  }
  return articles;
}

const ProfileView: React.FC<ProfileViewProps> = ({ nav, user }) => {
  const history = useHistory();

  const goToArticle = useCallback(
    (articleId: string) => {
      const url = paths.articleView.url({ articleId });
      history.push(url);
    },
    [history]
  );

  const topArticlesQuery = useMemo(() => {
    return {
      filters: {
        userId: user.uid,
      },
      limit: 3,
    };
  }, [user]);

  const topArticlesResult = useUserArticleQuery(topArticlesQuery);

  const checkInHistoryQuery = useMemo(() => {
    return {
      filters: {
        userIds: [user.uid],
      },
      limit: 5,
    };
  }, [user]);

  const checkInHistoryResult = useCheckInSearch(checkInHistoryQuery);

  const articleIds = useMemo(() => {
    return Object.values(checkInHistoryResult.data).map(
      (checkIn) => checkIn.data.articleId
    );
  }, [checkInHistoryResult.data]);

  const articleHistoryResult = useArticleStore(articleIds);

  const topArticles = useMemo(() => {
    if (topArticlesResult.busy) {
      return createFakeArticles(3);
    }
    return topArticlesResult.data;
  }, [topArticlesResult]);

  const checkInHistory = useMemo(() => {
    if (checkInHistoryResult.busy || articleHistoryResult.busy) {
      return [];
    }
    return checkInHistoryResult.data.map((checkIn) => ({
      checkIn,
      article: articleHistoryResult.data[checkIn.data.articleId],
    }));
  }, [checkInHistoryResult, articleHistoryResult]);

  return (
    <FullScreenLayout>
      <ViewBody>
        {nav}

        <ProfileHead user={user} />

        <SectionList>
          <Section header="Top drinks">
            <ItemList>
              {topArticles.map((article) => {
                return (
                  <button
                    key={article.id}
                    onClick={() => goToArticle(article.id)}
                  >
                    <ArticleItem article={article} />
                  </button>
                );
              })}
            </ItemList>
          </Section>

          <Section header="History">
            <ItemList>
              {checkInHistory.map(({ checkIn, article }) => {
                return (
                  <button
                    key={checkIn.id}
                    onClick={() => goToArticle(article.id)}
                  >
                    <CheckInItem checkIn={checkIn} article={article} />
                  </button>
                );
              })}
            </ItemList>
          </Section>
        </SectionList>
      </ViewBody>
    </FullScreenLayout>
  );
};

export default ProfileView;
