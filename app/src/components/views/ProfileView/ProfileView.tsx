import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import * as Trans from "./locales";
import ActionButton from "components/ui/trigger/ActionButton";
import * as paths from "components/route/paths";
import { useExplicitLogout } from "components/hooks/useExplicitLogout";
import ItemListGroup from "components/ui/layout/ItemListGroup";
import { useCheckInSearch } from "components/hooks/db/useCheckIns";
import { useUser } from "components/hooks/useUser";
import CheckIn from "./components/CheckIn";

interface ProfileViewProps {}

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
    };
  }, [user]);

  const checkInResult = useCheckInSearch(query);

  return (
    <HeaderLayout>
      <ViewCap top>
        <ViewTitle title="Profile" />
      </ViewCap>
      <ViewBody>
        <ItemListGroup title="User">
          <table>
            <tbody>
              <tr>
                <th>
                  <Trans.Email />
                </th>
                <td>{user?.email}</td>
              </tr>
            </tbody>
          </table>
        </ItemListGroup>

        <ActionButton variant="safe" onClick={goToExplore}>
          <Trans.FindDrink />
        </ActionButton>

        <ItemListGroup title="Check Ins">
          {!checkInResult.busy && (
            <table>
              <thead>
                <tr>
                  <th>CheckIn</th>
                  <th>Article</th>
                </tr>
              </thead>
              <tbody>
                {checkInResult.data.map((checkIn) => {
                  return <CheckIn key={checkIn.id} checkInId={checkIn.id} />;
                })}
              </tbody>
            </table>
          )}
        </ItemListGroup>

        <ItemListGroup title="Account">
          <ActionButton variant="danger" onClick={signOut}>
            Log out
          </ActionButton>
        </ItemListGroup>
      </ViewBody>
    </HeaderLayout>
  );
};

export default ProfileView;
