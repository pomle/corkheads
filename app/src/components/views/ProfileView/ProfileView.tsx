import React, { useMemo, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Section from "components/ui/layout/Section";
import SectionList from "components/ui/layout/SectionList";
import SectionTitle from "components/ui/layout/SectionTitle";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import ProfileHead from "components/fragments/User/ProfileHead";
import Panel from "./components/Panel";
import CheckInSection from "./components/CheckInSection";
import PillSwitch, { PillSwitchItem } from "components/ui/trigger/PillSwitch";
import SlidingWindow from "components/ui/transitions/SlidingWindow";
import Scroll from "components/ui/layout/Scroll";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import Dashboard from "components/fragments/User/Dashboard/Dashboard";
import ViewCap from "components/ui/layout/ViewCap";
import ViewHead from "components/ui/layout/ViewHead";
import FriendsSection from "./components/FriendsSection";
import NavIcon from "components/ui/trigger/NavIcon";
import { ReactComponent as CogIcon } from "assets/graphics/icons/cog.svg";
import { useNotifications } from "components/hooks/db/useNotifications";
import NotificationIcon from "./components/NotificationIcon";
import { useScreen } from "components/context/ScreenContext";
import { SlideRight } from "components/ui/transitions/Slide";
import NotificationsView from "../NotificationsView";

const useStyles = makeStyles({
  nav: {
    position: "relative",
  },
  icons: {
    alignItems: "center",
    display: "grid",
    gridGap: "16px",
    gridTemplateColumns: "repeat(2, 24px)",
    justifyContent: "center",
    position: "absolute",
    right: 0,
  },
  sectionControl: {
    borderBottom: "dashed 1px #dde4ef",
    padding: "8px",
  },
});

enum ProfileSection {
  Community,
  Dashboard,
}

interface ProfileViewProps {
  routes: {
    article: (articleId: string) => void;
    checkIn: (checkInId: string) => void;
    collection: () => string;
    communityCheckIns: () => string;
    contributions: () => string;
    checkIns: () => string;
    friends: () => string;
    settings: () => void;
    toplist: () => string;
    user: (userId: string) => void;
    wishlist: () => string;
  };
  userId: string;
}

const ProfileView: React.FC<ProfileViewProps> = ({ routes, userId }) => {
  const [section, setSection] = useState<ProfileSection>(
    ProfileSection.Community
  );

  const { notifications } = useNotifications(userId);

  const unseenNotificationCount = useMemo(() => {
    if (!notifications) {
      return;
    }

    return notifications.reduce((sum, n) => {
      return sum + (n.seen ? 0 : 1);
    }, 0);
  }, [notifications]);

  const goToNotifications = useScreen({
    path: (path) => path.append("/notifications", {}),
    render: () => <NotificationsView userId={userId} />,
    transition: SlideRight,
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme="dusk">
      <HeaderLayout>
        <ViewCap>
          <ViewHead>
            <div className={classes.nav}>
              <div className={classes.icons}>
                <NavIcon onClick={() => goToNotifications({})}>
                  <NotificationIcon count={unseenNotificationCount || 0} />
                </NavIcon>
                <NavIcon onClick={routes.settings}>
                  <CogIcon />
                </NavIcon>
              </div>
            </div>
            <ProfileHead userId={userId} />
          </ViewHead>
        </ViewCap>

        <ThemeProvider theme="pure">
          <Panel>
            <HeaderLayout>
              <div className={classes.sectionControl}>
                <PillSwitch selected={section} onChange={setSection}>
                  <PillSwitchItem value={ProfileSection.Community}>
                    Community
                  </PillSwitchItem>
                  <PillSwitchItem value={ProfileSection.Dashboard}>
                    Dashboard
                  </PillSwitchItem>
                </PillSwitch>
              </div>

              <SlidingWindow activeIndex={section}>
                <Scroll>
                  <SectionList>
                    <Section
                      header={
                        <SectionTitle
                          main="Recent check ins"
                          context={
                            <Link to={routes.communityCheckIns}>See all ›</Link>
                          }
                        />
                      }
                    >
                      <CheckInSection userId={userId} />
                    </Section>

                    <Section
                      header={
                        <SectionTitle
                          main="Friends"
                          context={<Link to={routes.friends}>See all ›</Link>}
                        />
                      }
                    >
                      <FriendsSection userId={userId} routes={routes} />
                    </Section>
                  </SectionList>
                </Scroll>

                <Scroll>
                  <Dashboard userId={userId} routes={routes} />
                </Scroll>
              </SlidingWindow>
            </HeaderLayout>
          </Panel>
        </ThemeProvider>
      </HeaderLayout>
    </ThemeProvider>
  );
};

export default ProfileView;
