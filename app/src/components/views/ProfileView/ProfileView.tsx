import React from "react";
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

interface ProfileViewProps {
  nav: React.ReactNode;
  routes: {
    collection: () => string;
    checkIns: () => string;
    toplist: () => string;
    wishlist: () => string;
  };
  userId: string;
}

const ProfileView: React.FC<ProfileViewProps> = ({ nav, routes, userId }) => {
  const { userData } = useUserData(userId);

  const { collectionSize, checkInCount, wishlistSize } = userData;

  return (
    <Themer theme="dusk">
      <FullScreenLayout>
        <ViewBody>
          {nav}

          <ProfileHead userId={userId} />

          <Themer theme="pure">
            <Panel>
              <SectionList>
                <Section
                  header={
                    <SectionTitle
                      main={<>Check ins ({checkInCount})</>}
                      context={<Link to={routes.checkIns}>See all ›</Link>}
                    />
                  }
                >
                  <CheckInSection userId={userId} />
                </Section>

                <Section
                  header={
                    <SectionTitle
                      main="Top drinks"
                      context={<Link to={routes.toplist}>See all ›</Link>}
                    />
                  }
                >
                  <ToplistSection userId={userId} />
                </Section>

                <Section
                  header={
                    <SectionTitle
                      main={<>Collection ({collectionSize})</>}
                      context={<Link to={routes.collection}>See all ›</Link>}
                    />
                  }
                >
                  <CollectionSection userId={userId} />
                </Section>

                <Section
                  header={
                    <SectionTitle
                      main={<>Wish list ({wishlistSize})</>}
                      context={<Link to={routes.wishlist}>See all ›</Link>}
                    />
                  }
                >
                  <WishlistSection userId={userId} />
                </Section>
              </SectionList>
            </Panel>
          </Themer>
        </ViewBody>
      </FullScreenLayout>
    </Themer>
  );
};

export default ProfileView;
