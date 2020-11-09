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

  const checkIns = useCheckInSearch(query);

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
          {!checkIns.busy && (
            <table>
              <thead>
                <tr>
                  <th>CheckIn</th>
                  <th>Article</th>
                </tr>
              </thead>
              <tbody>
                {checkIns.data.map((checkIn) => {
                  return <CheckIn checkInId={checkIn.id} />;
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
