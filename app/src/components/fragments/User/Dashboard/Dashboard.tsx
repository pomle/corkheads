import React from "react";
import Section from "components/ui/layout/Section";
import SectionList from "components/ui/layout/SectionList";
import SectionTitle from "components/ui/layout/SectionTitle";
import CollectionSection from "./components/CollectionSection";
import WishlistSection from "./components/WishlistSection";
import ContributionSection from "./components/ContributionSection";
import CheckInsSection from "./components/CheckInsSection";
import ToplistSection from "./components/ToplistSection";
import Badge from "components/ui/icons/Badge";
import Badged from "components/ui/typography/Badged";
import { useUser } from "components/hooks/db/useUsers";
import { createUser } from "types/User";
import { useScreen } from "components/context/ScreenContext";
import CheckInsView from "components/views/CheckInsView";
import { SlideRight } from "components/ui/transitions/Slide";
import UserToplistView from "components/views/UserToplistView";
import { stringCodec } from "components/route/codecs";
import ArticleDetailsView from "components/views/ArticleDetailsView";
import UserCollectionView from "components/views/UserCollectionView";
import UserWishlistView from "components/views/UserWishlistView";
import UserContributionsView from "components/views/UserContributionsView";
import { Path, PathCodec } from "lib/path";

interface UserViewProps {
  userId: string;
}

function createPath(pathString: string, codec: PathCodec = {}) {
  return function appendPath(path: Path<{}>) {
    return path.append(pathString, codec);
  };
}

const articlePath = createPath("/article/:articleId", {
  articleId: stringCodec,
});
const checkInsPath = createPath("/check-ins");
const collectionPath = createPath("/collection");
const contributionsPath = createPath("/contributions");
const toplistPath = createPath("/toplist");
const wishlistPath = createPath("/wishlist");

const UserView: React.FC<UserViewProps> = ({ userId }) => {
  const user = useUser(userId)?.data || createUser(userId);

  const goToArticle = useScreen({
    path: articlePath,
    render: ({ articleId }) => (
      <ArticleDetailsView userId={userId} articleId={articleId} />
    ),
    transition: SlideRight,
  });

  const goToCheckIns = useScreen({
    path: checkInsPath,
    render: () => <CheckInsView filterUserIds={[userId]} />,
    transition: SlideRight,
  });

  const goToCollection = useScreen({
    path: collectionPath,
    render: () => <UserCollectionView userId={userId} />,
    transition: SlideRight,
  });

  const goToContributions = useScreen({
    path: contributionsPath,
    render: () => <UserContributionsView userId={userId} />,
    transition: SlideRight,
  });

  const goToToplist = useScreen({
    path: toplistPath,
    render: () => <UserToplistView userId={userId} />,
    transition: SlideRight,
  });

  const goToWishlist = useScreen({
    path: wishlistPath,
    render: () => <UserWishlistView userId={userId} />,
    transition: SlideRight,
  });

  const {
    articleContributionsSize,
    collectionSize,
    checkInCount,
    wishlistSize,
  } = user;

  return (
    <SectionList>
      <Section
        header={
          <SectionTitle
            main={
              <Badged>
                Check ins <Badge type="rect">{checkInCount || 0}</Badge>
              </Badged>
            }
            context={
              <button onClick={() => goToCheckIns({})}>See all ›</button>
            }
          />
        }
      >
        <CheckInsSection userId={userId} />
      </Section>

      <Section
        header={
          <SectionTitle
            main={<>Favorites</>}
            context={<button onClick={() => goToToplist({})}>See all ›</button>}
          />
        }
      >
        <ToplistSection
          userId={userId}
          toArticle={(articleId) => goToArticle({ articleId })}
        />
      </Section>

      <Section
        header={
          <SectionTitle
            main={
              <Badged>
                Collection <Badge type="rect">{collectionSize || 0}</Badge>
              </Badged>
            }
            context={
              <button onClick={() => goToCollection({})}>See all ›</button>
            }
          />
        }
      >
        <CollectionSection
          userId={userId}
          toArticle={(articleId) => goToArticle({ articleId })}
        />
      </Section>

      <Section
        header={
          <SectionTitle
            main={
              <Badged>
                Wish list <Badge type="rect">{wishlistSize || 0}</Badge>
              </Badged>
            }
            context={
              <button onClick={() => goToWishlist({})}>See all ›</button>
            }
          />
        }
      >
        <WishlistSection
          userId={userId}
          toArticle={(articleId) => goToArticle({ articleId })}
        />
      </Section>

      {articleContributionsSize && (
        <Section
          header={
            <SectionTitle
              main={
                <Badged>
                  Contributions{" "}
                  <Badge type="rect">{articleContributionsSize || 0}</Badge>
                </Badged>
              }
              context={
                <button onClick={() => goToContributions({})}>See all ›</button>
              }
            />
          }
        >
          <ContributionSection
            userId={userId}
            toArticle={(articleId) => goToArticle({ articleId })}
          />
        </Section>
      )}
    </SectionList>
  );
};

export default UserView;
