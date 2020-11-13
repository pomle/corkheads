import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useExplicitLogout } from "components/hooks/useExplicitLogout";
import { useCheckInSearch } from "components/hooks/db/useCheckIns";
import ViewBody from "components/ui/layout/ViewBody";
import BusyView from "components/views/BusyView";
import NavigationBar from "components/ui/layout/NavigationBar";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";
import * as paths from "components/route/paths";
import ProfileHead from "./components/ProfileHead";
import { useArticleStore } from "components/hooks/db/useArticles";
import CheckInItem from "./components/CheckInItem";
import Section from "./components/Section";
import SectionList from "./components/SectionList";
import ItemList from "components/ui/layout/ItemList";

interface ProfileViewProps {
  user: firebase.User;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
  const history = useHistory();

  const signOut = useExplicitLogout();

  const goToArticle = useCallback(
    (articleId: string) => {
      const url = paths.articleView.url({ articleId });
      history.push(url);
    },
    [history]
  );

  const query = useMemo(() => {
    return {
      filters: {
        userIds: [user.uid],
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
            <ItemList>
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
            </ItemList>
          </Section>

          <Section header="History">
            <ItemList>
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
            </ItemList>
          </Section>
        </SectionList>
      </ViewBody>
    </FullScreenLayout>
  );
};

export default ProfileView;
