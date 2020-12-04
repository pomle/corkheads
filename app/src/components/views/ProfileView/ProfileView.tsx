import React from "react";
import ViewBody from "components/ui/layout/ViewBody";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";
import Section from "components/ui/layout/Section";
import SectionList from "components/ui/layout/SectionList";
import { User } from "types/User";
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
  user: User;
}

const ProfileView: React.FC<ProfileViewProps> = ({ nav, user }) => {
  const [userData] = useUserData(user.uid);

  const { collectionSize, checkInCount, wishlistSize } = userData;

  return (
    <Themer theme="dusk">
      <FullScreenLayout>
        <ViewBody>
          {nav}

          <ProfileHead user={user} />

          <Themer theme="pure">
            <Panel>
              <SectionList>
                <Section
                  header={
                    <SectionTitle
                      main="Top drinks"
                      context={<a href="/">See all ›</a>}
                    />
                  }
                >
                  <ToplistSection userId={user.uid} />
                </Section>

                <Section
                  header={
                    <SectionTitle
                      main={<>Check ins ({checkInCount})</>}
                      context={<a href="/">See all ›</a>}
                    />
                  }
                >
                  <CheckInSection userId={user.uid} />
                </Section>

                <Section
                  header={
                    <SectionTitle
                      main={<>Collection ({collectionSize})</>}
                      context={<a href="/">See all ›</a>}
                    />
                  }
                >
                  <CollectionSection userId={user.uid} />
                </Section>

                <Section
                  header={
                    <SectionTitle
                      main={<>Wish list ({wishlistSize})</>}
                      context={<a href="/">See all › </a>}
                    />
                  }
                >
                  <WishlistSection userId={user.uid} />
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
