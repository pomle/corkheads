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
import TopArticleItem from "./components/TopArticleItem";
import { User } from "types/user";

interface ProfileViewProps {
  nav: React.ReactNode;
  user: User;
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
      limit: 3,
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
      return [];
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
              {topArticles.map(({ article, userArticle }) => {
                return (
                  <button
                    key={userArticle.id}
                    onClick={() => goToArticle(article.id)}
                  >
                    <TopArticleItem
                      article={article}
                      userArticle={userArticle}
                    />
                  </button>
                );
              })}
            </ItemList>
          </Section>

          <Section header="Check ins">
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
