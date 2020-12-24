import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import ViewBody from "components/ui/layout/ViewBody";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";
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
      <FullScreenLayout>
        <ViewBody>
          {nav}

          <ProfileHead userId={userId} />

          <Themer theme="pure">
            <Panel>
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

                <SectionList>
                  <Section
                    header={
                      <SectionTitle
                        main={<>Check ins ({checkInCount})</>}
                        context={<Link to={routes.checkIns}>See all ›</Link>}
                      />
                    }
                  >
                    <UserCheckInSection userId={userId} routes={routes} />
                  </Section>

                  <Section
                    header={
                      <SectionTitle
                        main="Favorites"
                        context={<Link to={routes.toplist}>See all ›</Link>}
                      />
                    }
                  >
                    <ToplistSection userId={userId} routes={routes} />
                  </Section>

                  <Section
                    header={
                      <SectionTitle
                        main={<>Collection ({collectionSize})</>}
                        context={<Link to={routes.collection}>See all ›</Link>}
                      />
                    }
                  >
                    <CollectionSection userId={userId} routes={routes} />
                  </Section>

                  <Section
                    header={
                      <SectionTitle
                        main={<>Wish list ({wishlistSize})</>}
                        context={<Link to={routes.wishlist}>See all ›</Link>}
                      />
                    }
                  >
                    <WishlistSection userId={userId} routes={routes} />
                  </Section>
                </SectionList>
              </SlidingWindow>
            </Panel>
          </Themer>
        </ViewBody>
      </FullScreenLayout>
    </Themer>
  );
};

export default ProfileView;
