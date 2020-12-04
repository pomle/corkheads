import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import ViewBody from "components/ui/layout/ViewBody";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";
import Section from "components/ui/layout/Section";
import SectionList from "components/ui/layout/SectionList";
import CheckInItem from "components/fragments/CheckIn/CheckInItem";
import WishlistArticleItem from "components/fragments/Article/WishlistArticleItem";
import TopArticleItem from "components/fragments/Article/TopArticleItem";
import * as paths from "components/route/paths";
import ItemList from "components/ui/layout/ItemList";
import {
  UserArticleQuery,
  useUserArticleQuery,
} from "components/hooks/db/useUserArticleQuery";
import { User } from "types/User";
import SectionTitle from "components/ui/layout/SectionTitle";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";
import {
  UserWishlistArticleQuery,
  useUserWishlistArticleQuery,
} from "components/hooks/db/useUserWishlistArticleQuery";
import Themer from "components/ui/theme/Themer";
import ProfileHead from "./components/ProfileHead";
import Panel from "./components/Panel";
import CollectionSection from "./components/CollectionSection";

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

  const goToCheckIn = useCallback(
    (checkInId: string) => {
      const url = paths.checkInView.url({ checkInId });
      history.push(url);
    },
    [history]
  );

  const topArticlesQuery = useMemo((): UserArticleQuery => {
    return {
      filters: {
        userId: user.uid,
      },
      order: [
        {
          field: "checkIns",
          dir: "desc",
        },
      ],
      limit: 3,
    };
  }, [user]);

  const topArticlesResult = useUserArticleQuery(topArticlesQuery);

  const wishlistArticlesQuery = useMemo((): UserWishlistArticleQuery => {
    return {
      filters: {
        userId: user.uid,
      },
      order: [{ field: "addedTimestamp", dir: "desc" }],
      limit: 3,
    };
  }, [user]);

  const wishlistArticlesResult = useUserWishlistArticleQuery(
    wishlistArticlesQuery
  );

  const checkInHistoryQuery = useMemo((): CheckInQuery => {
    return {
      filters: {
        userIds: [user.uid],
      },
      order: [
        {
          field: "timestamp",
          dir: "desc",
        },
      ],
      limit: 3,
    };
  }, [user]);

  const checkInHistoryResult = useCheckInQuery(checkInHistoryQuery);

  return (
    <Themer theme="dusk">
      <FullScreenLayout>
        <ViewBody>
          {nav}

          <ProfileHead user={user} />

          <Themer theme="pure">
            <Panel>
              <SectionList>
                <Section
                  header={
                    <SectionTitle
                      main="Top drinks"
                      context={<a href="/">See all ›</a>}
                    />
                  }
                >
                  <ItemList>
                    {topArticlesResult &&
                      topArticlesResult.map(
                        ({ articleEntry, userArticleEntry }) => {
                          const article = articleEntry.data;
                          const userArticle = userArticleEntry.data;

                          return (
                            <button
                              key={articleEntry.id}
                              onClick={() => goToArticle(articleEntry.id)}
                            >
                              {article && userArticle && (
                                <TopArticleItem
                                  article={article}
                                  userArticle={userArticle}
                                />
                              )}
                            </button>
                          );
                        }
                      )}
                  </ItemList>
                </Section>

                <Section
                  header={
                    <SectionTitle
                      main="Check ins"
                      context={<a href="/">See all ›</a>}
                    />
                  }
                >
                  <ItemList>
                    {checkInHistoryResult &&
                      checkInHistoryResult.map(
                        ({ checkInEntry, articleEntry }) => {
                          const article = articleEntry.data;
                          const checkIn = checkInEntry.data;

                          return (
                            <button
                              key={checkInEntry.id}
                              onClick={() => goToCheckIn(checkInEntry.id)}
                            >
                              {article && checkIn && (
                                <CheckInItem
                                  checkIn={checkIn}
                                  article={article}
                                />
                              )}
                            </button>
                          );
                        }
                      )}
                  </ItemList>
                </Section>

                <Section
                  header={
                    <SectionTitle
                      main="Collection"
                      context={<a href="/">See all ›</a>}
                    />
                  }
                >
                  <CollectionSection userId={user.uid} />
                </Section>

                <Section
                  header={
                    <SectionTitle
                      main="Wish list"
                      context={<a href="/">See all › </a>}
                    />
                  }
                >
                  <ItemList>
                    {wishlistArticlesResult &&
                      wishlistArticlesResult.map(({ articleEntry }) => {
                        const article = articleEntry.data;

                        return (
                          <button
                            key={articleEntry.id}
                            onClick={() => goToArticle(articleEntry.id)}
                          >
                            {article && (
                              <WishlistArticleItem article={article} />
                            )}
                          </button>
                        );
                      })}
                  </ItemList>
                </Section>
              </SectionList>
            </Panel>
          </Themer>
        </ViewBody>
      </FullScreenLayout>
    </Themer>
  );
};

export default ProfileView;
