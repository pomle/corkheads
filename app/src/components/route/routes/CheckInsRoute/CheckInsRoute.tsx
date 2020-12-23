import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import CheckInsPage from "./pages/CheckInsPage";
import { Path } from "lib/path";
import { stringCodec } from "components/route/codecs";
import CheckInRoutes from "components/route/routes/CheckInRoutes";

interface CollectionRouteProps {
  origin: Path<{}>;
  path: Path<{}>;
  userId: string;
}

const CollectionRoute: React.FC<CollectionRouteProps> = ({
  userId,
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
      <CheckInsPage routes={routes} userId={userId} />
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

export default CollectionRoute;