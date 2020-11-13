import React from "react";
import { useUser } from "components/hooks/useUser";
import BusyView from "components/views/BusyView";
import ProfileView from "components/views/ProfileView";
import ViewStack from "components/ui/layout/ViewStack";
import FindDrinkOverlayView from "components/views/FindDrinkOverlayView";

const ProfilePage: React.FC = () => {
  const user = useUser();

  if (!user) {
    return <BusyView />;
  }

  return (
    <ViewStack>
      <ProfileView user={user} />
      <FindDrinkOverlayView />
    </ViewStack>
  );
};

export default ProfilePage;
