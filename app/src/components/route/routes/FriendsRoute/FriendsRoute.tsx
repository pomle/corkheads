import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import UserRoutes from "components/route/routes/UserRoutes";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import { Path } from "lib/path";
import { stringCodec } from "components/route/codecs";
import FriendsPage from "./pages/FriendsPage";

interface FriendsRouteProps {
  origin: Path<{}>;
  path: Path<{}>;
  userId: string;
}

const FriendsRoute: React.FC<FriendsRouteProps> = ({
  userId,
  origin,
  path,
}) => {
  const history = useHistory();

  const paths = useMemo(
    () => ({
      user: path.append("/:userId", {
        userId: stringCodec,
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
      user: (userId: string) => {
        const url = paths.user.url({ userId });
        history.push(url);
      },
    }),
    [origin, paths, history]
  );

  return (
    <ViewStack>
      <FriendsPage routes={routes} userId={userId} />
      <Screen path={paths.user} transition={SlideRight}>
        {(match) => (
          <UserRoutes
            origin={path}
            path={match.path}
            userId={match.params.userId}
          />
        )}
      </Screen>
    </ViewStack>
  );
};

export default FriendsRoute;
