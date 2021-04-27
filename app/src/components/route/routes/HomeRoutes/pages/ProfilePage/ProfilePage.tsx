import React from "react";
import ProfileView from "components/views/ProfileView";
import ViewStack from "components/ui/layout/ViewStack";
import FindDrinkOverlayView from "components/views/FindDrinkOverlayView";

interface ProfilePageProps {
  userId: string;
  routes: {
    article: (articleId: string) => void;
    checkIn: (checkInId: string) => void;
    checkIns: () => string;
    collection: () => string;
    communityCheckIns: () => string;
    contributions: () => string;
    friends: () => string;
    search: () => void;
    settings: () => void;
    toplist: () => string;
    user: (userId: string) => void;
    wishlist: () => string;
  };
}

const ProfilePage: React.FC<ProfilePageProps> = ({ routes, userId }) => {
  return (
    <ViewStack>
      <ProfileView routes={routes} userId={userId} />
      <FindDrinkOverlayView routes={routes} />
    </ViewStack>
  );
};

export default ProfilePage;
