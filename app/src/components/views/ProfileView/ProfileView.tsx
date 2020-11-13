import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import ViewBody from "components/ui/layout/ViewBody";
import * as Trans from "./locales";
import ActionButton from "components/ui/trigger/ActionButton";
import * as paths from "components/route/paths";
import { useExplicitLogout } from "components/hooks/useExplicitLogout";
import { useCheckInSearch } from "components/hooks/db/useCheckIns";
import { useUser } from "components/hooks/useUser";
import BusyView from "components/views/BusyView";
import NavigationBar from "components/ui/layout/NavigationBar";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";
import ProfileHead from "./components/ProfileHead";
import { useArticleStore } from "components/hooks/db/useArticles";
import CheckInItem from "./components/CheckInItem";
import Section from "./components/Section";
import SectionList from "./components/SectionList";

interface ProfileViewProps {}

const ProfileView: React.FC<ProfileViewProps> = () => {
  const history = useHistory();

  const signOut = useExplicitLogout();

  const goToExplore = useCallback(() => {
    const url = paths.exploreArticles.url({});
    history.push(url);
  }, [history]);

  const goToArticle = useCallback(
    (articleId: string) => {
      const url = paths.articleView.url({ articleId });
      history.push(url);
    },
    [history]
  );

  const user = useUser();

  const query = useMemo(() => {
    return {
      filters: {
        userIds: user ? [user.uid] : [],
      },
      limit: 3,
    };
  }, [user]);

  const checkInResult = useCheckInSearch(query);
  console.log("CheckInResult", checkInResult);

  const articleIds = useMemo(() => {
    return Object.values(checkInResult.data).map(
      (checkIn) => checkIn.data.articleId
    );
  }, [checkInResult.data]);

  const articleResult = useArticleStore(articleIds);

  if (!user || checkInResult.busy || articleResult.busy) {
    return <BusyView />;
  }

  return (
    <FullScreenLayout>
      <ViewBody>
        <NavigationBar forward={<button onClick={signOut}>Log out</button>} />

        <ProfileHead user={user} />

        <SectionList>
          <Section header="Top drinks">
            {checkInResult.data.map((checkIn) => {
              const articleId = checkIn.data.articleId;
              const article = articleResult.data[articleId];
              return (
                <button onClick={() => goToArticle(articleId)}>
                  <CheckInItem
                    key={checkIn.id}
                    checkIn={checkIn}
                    article={article}
                  />
                </button>
              );
            })}
          </Section>

          <Section header="History">
            {checkInResult.data.map((checkIn) => {
              const articleId = checkIn.data.articleId;
              const article = articleResult.data[articleId];
              return (
                <button onClick={() => goToArticle(articleId)}>
                  <CheckInItem
                    key={checkIn.id}
                    checkIn={checkIn}
                    article={article}
                  />
                </button>
              );
            })}
          </Section>
        </SectionList>

        <ActionButton variant="action" onClick={goToExplore}>
          <Trans.FindDrink />
        </ActionButton>
      </ViewBody>
    </FullScreenLayout>
  );
};

export default ProfileView;
