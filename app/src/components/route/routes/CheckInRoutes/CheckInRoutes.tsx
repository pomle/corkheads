import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { ZoomCenter } from "components/ui/transitions/Zoom";
import * as paths from "components/route/paths";
import CheckInPage from "./pages/CheckInPage";
import CheckInPicturePage from "./pages/CheckInPicturePage";
import * as rootPaths from "../../paths";

interface CheckInRoutesProps {
  checkInId: string;
}

const CheckInRoutes: React.FC<CheckInRoutesProps> = ({ checkInId }) => {
  const history = useHistory();

  const routes = useMemo(
    () => ({
      back: () => {
        const url = rootPaths.checkInView.url({ checkInId });
        history.push(url);
      },
    }),
    [checkInId, history]
  );

  return (
    <ViewStack>
      <CheckInPage checkInId={checkInId} />
      <Screen path={paths.checkInPicture} transition={ZoomCenter}>
        {(params) => (
          <CheckInPicturePage routes={routes} checkInId={params.checkInId} />
        )}
      </Screen>
    </ViewStack>
  );
};

export default CheckInRoutes;
