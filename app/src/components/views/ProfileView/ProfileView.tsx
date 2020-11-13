import React, { useCallback, useMemo, useState } from "react";
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

interface ProfileViewProps {}

const articleIdsA = ["AAA", "BBB", "CCC"];

const articleIdsB = ["GGG", "FFF", "CCC"];

const ProfileView: React.FC<ProfileViewProps> = () => {
  const history = useHistory();

  const signOut = useExplicitLogout();

  const goToExplore = useCallback(() => {
    const url = paths.exploreArticles.url({});
    history.push(url);
  }, [history]);

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

  const articleIds = useMemo(() => {
    console.log("checkInResult", checkInResult);
    return Object.values(checkInResult.data).map(
      (checkIn) => checkIn.data.articleId
    );
  }, [checkInResult.data]);

  const articleResultA = useArticleStore(articleIdsA);
  const articleResultB = useArticleStore(articleIdsB);
  console.log("A", articleResultA);
  console.log("B", articleResultB);

  if (!user || checkInResult.busy) {
    return <BusyView />;
  }

  return (
    <FullScreenLayout>
      <ViewBody>
        <NavigationBar forward={<button onClick={signOut}>Log out</button>} />

        <ProfileHead user={user} />

        <ActionButton variant="safe" onClick={goToExplore}>
          <Trans.FindDrink />
        </ActionButton>
      </ViewBody>
    </FullScreenLayout>
  );
};

export default ProfileView;
