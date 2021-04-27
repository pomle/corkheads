import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import { Path } from "lib/path";
import { stringCodec } from "components/route/codecs";
import CheckInRoutes from "components/route/routes/CheckInRoutes";
import CheckInsView from "components/views/CheckInsView";

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
        checkInId: stringCodec,
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
      <CheckInsView filterUserIds={filterUserIds} />
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
