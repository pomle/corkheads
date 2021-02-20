import React from "react";
import NavigationBar, { Nav } from "components/ui/layout/NavigationBar";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import ProfileHead from "components/fragments/User/ProfileHead";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewBody from "components/ui/layout/ViewBody";
import Dashboard from "components/fragments/User/Dashboard/Dashboard";
import ViewCap from "components/ui/layout/ViewCap";
import ViewHead from "components/ui/layout/ViewHead";

interface UserViewProps {
  nav: Nav;
  routes: {
    article: (articleId: string) => void;
    checkIn: (checkInId: string) => void;
    collection: () => string;
    contributions: () => string;
    checkIns: () => string;
    toplist: () => string;
    wishlist: () => string;
  };
  userId: string;
}

const UserView: React.FC<UserViewProps> = ({ nav, routes, userId }) => {
  return (
    <ThemeProvider theme="dusk">
      <HeaderLayout>
        <ViewCap>
          <NavigationBar nav={nav} />
          <ViewHead>
            <ProfileHead userId={userId} />
          </ViewHead>
        </ViewCap>
        <ThemeProvider theme="pure">
          <ViewBody>
            <Dashboard userId={userId} routes={routes} />
          </ViewBody>
        </ThemeProvider>
      </HeaderLayout>
    </ThemeProvider>
  );
};

export default UserView;
