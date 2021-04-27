import React from "react";
import NavigationBar from "components/ui/layout/NavigationBar";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import ProfileHead from "components/fragments/User/ProfileHead";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewBody from "components/ui/layout/ViewBody";
import Dashboard from "components/fragments/User/Dashboard/Dashboard";
import ViewCap from "components/ui/layout/ViewCap";
import ViewHead from "components/ui/layout/ViewHead";
import BackButton from "components/ui/trigger/BackButton";
import { useBack } from "components/context/ScreenContext";

interface UserViewProps {
  userId: string;
}

const UserView: React.FC<UserViewProps> = ({ userId }) => {
  const goBack = useBack();

  return (
    <ThemeProvider theme="dusk">
      <HeaderLayout>
        <ViewCap>
          <NavigationBar nav={{ back: <BackButton onClick={goBack} /> }} />
          <ViewHead>
            <ProfileHead userId={userId} />
          </ViewHead>
        </ViewCap>
        <ThemeProvider theme="pure">
          <ViewBody>
            <Dashboard userId={userId} />
          </ViewBody>
        </ThemeProvider>
      </HeaderLayout>
    </ThemeProvider>
  );
};

export default UserView;
