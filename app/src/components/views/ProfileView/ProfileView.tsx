import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import ViewBody from "components/ui/layout/ViewBody";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";
import Section from "components/ui/layout/Section";
import SectionList from "components/ui/layout/SectionList";
import * as paths from "components/route/paths";
import ProfileHead from "./components/ProfileHead";
import CheckInItem from "./components/CheckInItem";
import ItemList from "components/ui/layout/ItemList";
import { useUserArticleQuery } from "components/hooks/db/useUserArticleQuery";
import TopArticleItem from "./components/TopArticleItem";
import { User } from "types/User";
import CollectionList from "components/ui/layout/CollectionList";
import CollectionItem from "components/ui/layout/CollectionItem/CollectionItem";
import SectionTitle from "components/ui/layout/SectionTitle";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";

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

  const topArticlesQuery = useMemo(() => {
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

  const ownedArticlesQuery = useMemo(() => {
    return {
      filters: {
        userId: user.uid,
        owner: true,
      },
      limit: 3,
    };
  }, [user]);

  const ownedArticlesResult = useUserArticleQuery(ownedArticlesQuery);

  const wishlistArticlesQuery = useMemo(() => {
    return {
      filters: {
        userId: user.uid,
        wishlist: true,
      },
      limit: 3,
    };
  }, [user]);

  const wishlistArticlesResult = useUserArticleQuery(wishlistArticlesQuery);

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

  const topArticles = useMemo(() => {
    if (topArticlesResult.busy) {
      return [];
    }
    return topArticlesResult.data;
  }, [topArticlesResult]);

  return (
    <FullScreenLayout>
      <ViewBody>
        {nav}

        <ProfileHead user={user} />

        <SectionList>
          <Section
            header={
              <SectionTitle
                main="Top drinks"
                context={<a href="/">See all</a>}
              />
            }
          >
            <ItemList>
              {topArticles.map(({ article, userArticle }) => {
                return (
                  <button
                    key={userArticle.id}
                    onClick={() => goToArticle(article.id)}
                  >
                    <TopArticleItem
                      article={article.data}
                      userArticle={userArticle.data}
                    />
                  </button>
                );
              })}
            </ItemList>
          </Section>

          <Section
            header={
              <SectionTitle
                main="Check ins"
                context={<a href="/">See all</a>}
              />
            }
          >
            <ItemList>
              {checkInHistoryResult.data.map(({ checkIn, article }) => {
                return (
                  <button
                    key={checkIn.id}
                    onClick={() => goToCheckIn(checkIn.id)}
                  >
                    <CheckInItem
                      checkIn={checkIn.data}
                      article={article.data}
                    />
                  </button>
                );
              })}
            </ItemList>
          </Section>

          <Section
            header={
              <SectionTitle
                main="Collection"
                context={<a href="/">See all</a>}
              />
            }
          >
            <CollectionList>
              {ownedArticlesResult.data.map(({ article, userArticle }) => {
                const photoURL = article.data.photoURL;
                return (
                  <button
                    key={article.id}
                    onClick={() => goToArticle(article.id)}
                  >
                    <CollectionItem key={article.id} imageURL={photoURL}>
                      {article.data.displayName}
                    </CollectionItem>
                  </button>
                );
              })}
            </CollectionList>
          </Section>

          <Section
            header={
              <SectionTitle main="Wishlist" context={<a href="/">See all</a>} />
            }
          >
            <CollectionList>
              {wishlistArticlesResult.data.map(({ article }) => {
                const photoURL = article.data.photoURL;
                return (
                  <button
                    key={article.id}
                    onClick={() => goToArticle(article.id)}
                  >
                    <CollectionItem key={article.id} imageURL={photoURL}>
                      {article.data.displayName}
                    </CollectionItem>
                  </button>
                );
              })}
            </CollectionList>
          </Section>
        </SectionList>
      </ViewBody>
    </FullScreenLayout>
  );
};

export default ProfileView;
