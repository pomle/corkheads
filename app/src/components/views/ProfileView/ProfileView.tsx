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
import NavigationBar from "components/ui/layout/NavigationBar";
import NavIcon from "components/ui/trigger/NavIcon";
import { ReactComponent as CogIcon } from "assets/graphics/icons/cog.svg";
import { useNotifications } from "components/hooks/db/useNotifications";
import NotificationIcon from "./components/NotificationIcon";

const useStyles = makeStyles({
  findFriendsButton: {
    padding: "16px",
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
    notifications: () => void;
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

  const classes = useStyles();

  return (
    <ThemeProvider theme="dusk">
      <HeaderLayout>
        <ViewCap>
          <NavigationBar
            back={
              <NavIcon onClick={routes.notifications}>
                <NotificationIcon count={unseenNotificationCount || 0} />
              </NavIcon>
            }
            forward={
              <NavIcon onClick={routes.settings}>
                <CogIcon />
              </NavIcon>
            }
          />

          <ViewHead>
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
                      <CheckInSection userId={userId} routes={routes} />
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
