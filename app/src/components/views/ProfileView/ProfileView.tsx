import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { useAuth } from "components/hooks/useAuth";
import * as Trans from "./locales";
import ActionButton from "components/ui/trigger/ActionButton";
import * as paths from "components/route/paths";
import { useExplicitLogout } from "components/hooks/useExplicitLogout";

interface ProfileViewProps {}

const ProfileView: React.FC<ProfileViewProps> = () => {
  const history = useHistory();

  const signOut = useExplicitLogout();

  const goToExplore = useCallback(() => {
    const url = paths.exploreArticles.url({});
    history.push(url);
  }, [history]);

  const { user } = useAuth();

  return (
    <HeaderLayout>
      <ViewCap top>
        <ViewTitle title="Profile" />
      </ViewCap>
      <ViewBody>
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

        <ActionButton variant="safe" onClick={goToExplore}>
          <Trans.FindDrink />
        </ActionButton>

        <ActionButton variant="safe" onClick={signOut}>
          Log out
        </ActionButton>
      </ViewBody>
    </HeaderLayout>
  );
};

export default ProfileView;
