import React from "react";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { ZoomCenter } from "components/ui/transitions/Zoom";
import * as paths from "components/route/paths";
import CheckInPage from "./pages/CheckInPage";
import CheckInPicturePage from "./pages/CheckInPicturePage";

interface CheckInRoutesProps {
  checkInId: string;
}

const CheckInRoutes: React.FC<CheckInRoutesProps> = ({ checkInId }) => {
  return (
    <ViewStack>
      <CheckInPage checkInId={checkInId} />
      <Screen path={paths.checkInPicture} transition={ZoomCenter}>
        {(params) => <CheckInPicturePage checkInId={params.checkInId} />}
      </Screen>
    </ViewStack>
  );
};

export default CheckInRoutes;
