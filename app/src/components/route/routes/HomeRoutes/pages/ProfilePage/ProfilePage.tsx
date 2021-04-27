import React from "react";
import ProfileView from "components/views/ProfileView";
import ViewStack from "components/ui/layout/ViewStack";
import FindDrinkOverlayView from "components/views/FindDrinkOverlayView";

interface ProfilePageProps {
  userId: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  return (
    <ViewStack>
      <ProfileView userId={userId} />
      <FindDrinkOverlayView userId={userId} />
    </ViewStack>
  );
};

export default ProfilePage;
