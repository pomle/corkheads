import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import CheckInsPage from "./pages/CheckInsPage";
import { Path, codecs } from "@pomle/paths";
import CheckInRoutes from "components/route/routes/CheckInRoutes";

interface CheckInsRouteProps {
  origin: Path<{}>;
  path: Path<{}>;
  userId: string;
  filterUserIds?: string[];
}

const CheckInsRoute: React.FC<CheckInsRouteProps> = ({
  userId,
  filterUserIds,
  origin,
  path,
}) => {
  const history = useHistory();

  const paths = useMemo(
    () => ({
      checkIn: path.append("/:checkInId", {
        checkInId: codecs.string,
      }),
    }),
    [path]
  );

  const routes = useMemo(
    () => ({
      back: () => {
        const url = origin.url({});
        history.push(url);
      },
      checkIn: (checkInId: string) => {
        const url = paths.checkIn.url({ checkInId });
        history.push(url);
      },
    }),
    [origin, paths, history]
  );

  return (
    <ViewStack>
      <CheckInsPage
        routes={routes}
        userId={userId}
        filterUserIds={filterUserIds}
      />
      <Screen path={paths.checkIn} transition={SlideRight}>
        {(match) => (
          <CheckInRoutes
            origin={path}
            path={match.path}
            userId={userId}
            checkInId={match.params.checkInId}
          />
        )}
      </Screen>
    </ViewStack>
  );
};

export default CheckInsRoute;
