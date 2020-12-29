import React, { useState } from "react";
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
import ButtonSet from "components/ui/layout/ButtonSet";
import ActionButton from "components/ui/trigger/ActionButton";

const useStyles = makeStyles({
  head: {
    marginTop: "-32px",
  },
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
  nav: React.ReactNode;
  routes: {
    article: (articleId: string) => void;
    checkIn: (checkInId: string) => void;
    collection: () => string;
    communityCheckIns: () => string;
    checkIns: () => string;
    toplist: () => string;
    userSearch: () => void;
    wishlist: () => string;
  };
  userId: string;
}

const ProfileView: React.FC<ProfileViewProps> = ({ nav, routes, userId }) => {
  const [section, setSection] = useState<ProfileSection>(
    ProfileSection.Community
  );

  const classes = useStyles();

  return (
    <ThemeProvider theme="dusk">
      <HeaderLayout>
        <ViewCap>
          {nav}

          <div className={classes.head}>
            <ViewHead>
              <ProfileHead userId={userId} />
            </ViewHead>
          </div>
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
                  <div className={classes.findFriendsButton}>
                    <ButtonSet>
                      <ActionButton onClick={routes.userSearch}>
                        Find friends
                      </ActionButton>
                    </ButtonSet>
                  </div>

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
