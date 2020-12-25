import React from "react";
import { Link } from "react-router-dom";
import Section from "components/ui/layout/Section";
import SectionList from "components/ui/layout/SectionList";
import SectionTitle from "components/ui/layout/SectionTitle";
import CollectionSection from "./components/CollectionSection";
import WishlistSection from "./components/WishlistSection";
import CheckInsSection from "./components/CheckInsSection";
import ToplistSection from "./components/ToplistSection";
import Badge from "components/ui/icons/Badge";
import Badged from "components/ui/typography/Badged";
import { useUser } from "components/hooks/db/useUsers";
import { createUser } from "types/User";

interface UserViewProps {
  userId: string;
  routes: {
    article: (articleId: string) => void;
    checkIn: (checkInId: string) => void;
    collection: () => string;
    checkIns: () => string;
    toplist: () => string;
    wishlist: () => string;
  };
}

const UserView: React.FC<UserViewProps> = ({ routes, userId }) => {
  const user = useUser(userId)?.data || createUser(userId);

  const { collectionSize, checkInCount, wishlistSize } = user;

  return (
    <SectionList>
      <Section
        header={
          <SectionTitle
            main={
              <Badged>
                Check ins <Badge>{checkInCount}</Badge>
              </Badged>
            }
            context={<Link to={routes.checkIns()}>See all ›</Link>}
          />
        }
      >
        <CheckInsSection userId={userId} routes={routes} />
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
            context={<Link to={routes.collection}>See all ›</Link>}
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
  );
};

export default UserView;
