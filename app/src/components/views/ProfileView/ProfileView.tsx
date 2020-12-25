import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Section from "components/ui/layout/Section";
import SectionList from "components/ui/layout/SectionList";
import SectionTitle from "components/ui/layout/SectionTitle";
import Themer from "components/ui/theme/Themer";
import ProfileHead from "./components/ProfileHead";
import Panel from "./components/Panel";
import CollectionSection from "./components/CollectionSection";
import WishlistSection from "./components/WishlistSection";
import CheckInSection from "./components/CheckInSection";
import ToplistSection from "./components/ToplistSection";
import { useUserData } from "components/hooks/db/useUserData";
import PillSwitch, { PillSwitchItem } from "components/ui/trigger/PillSwitch";
import SlidingWindow from "components/ui/transitions/SlidingWindow";
import UserCheckInSection from "./components/UserCheckInSection";
import Scroll from "components/ui/layout/Scroll";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import Badge from "components/ui/icons/Badge";
import Badged from "components/ui/typography/Badged";

const useStyles = makeStyles({
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
    checkIns: () => string;
    toplist: () => string;
    wishlist: () => string;
  };
  userId: string;
}

const ProfileView: React.FC<ProfileViewProps> = ({ nav, routes, userId }) => {
  const [section, setSection] = useState<ProfileSection>(
    ProfileSection.Community
  );

  const { userData } = useUserData(userId);

  const { collectionSize, checkInCount, wishlistSize } = userData;

  const classes = useStyles();

  return (
    <Themer theme="dusk">
      <HeaderLayout>
        <>
          {nav}

          <ProfileHead userId={userId} />
        </>

        <Themer theme="pure">
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
                          context={<Link to={routes.checkIns}>See all ›</Link>}
                        />
                      }
                    >
                      <CheckInSection userId={userId} routes={routes} />
                    </Section>
                  </SectionList>
                </Scroll>

                <Scroll>
                  <SectionList>
                    <Section
                      header={
                        <SectionTitle
                          main={
                            <Badged>
                              Check ins <Badge>{checkInCount}</Badge>
                            </Badged>
                          }
                          context={<Link to={routes.checkIns}>See all ›</Link>}
                        />
                      }
                    >
                      <UserCheckInSection userId={userId} routes={routes} />
                    </Section>

                    <Section
                      header={
                        <SectionTitle
                          main={<>Favorites</>}
                          context={<Link to={routes.toplist}>See all ›</Link>}
                        />
                      }
                    >
                      <ToplistSection userId={userId} routes={routes} />
                    </Section>

                    <Section
                      header={
                        <SectionTitle
                          main={
                            <Badged>
                              Collection <Badge>{collectionSize}</Badge>
                            </Badged>
                          }
                          context={
                            <Link to={routes.collection}>See all ›</Link>
                          }
                        />
                      }
                    >
                      <CollectionSection userId={userId} routes={routes} />
                    </Section>

                    <Section
                      header={
                        <SectionTitle
                          main={
                            <Badged>
                              Wish list <Badge>{wishlistSize}</Badge>
                            </Badged>
                          }
                          context={<Link to={routes.wishlist}>See all ›</Link>}
                        />
                      }
                    >
                      <WishlistSection userId={userId} routes={routes} />
                    </Section>
                  </SectionList>
                </Scroll>
              </SlidingWindow>
            </HeaderLayout>
          </Panel>
        </Themer>
      </HeaderLayout>
    </Themer>
  );
};

export default ProfileView;
