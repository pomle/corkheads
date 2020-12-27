import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import FindPage from "./pages/FindPage";
import { SlideRight } from "components/ui/transitions/Slide";
import { Path } from "lib/path";
import { stringCodec } from "components/route/codecs";
import UserRoutes from "components/route/routes/UserRoutes/UserRoutes";

interface SearchUserRoutesProps {
  userId: string;
  origin: Path<{}>;
  path: Path<{}>;
}

const SearchUserRoutes: React.FC<SearchUserRoutesProps> = ({
  userId,
  origin,
  path,
}) => {
  const history = useHistory();

  const paths = useMemo(
    () => ({
      user: path.append("/user/:userId", {
        userId: stringCodec,
      }),
    }),
    [path]
  );

  const routes = useMemo(
    () => ({
      parent() {
        const url = origin.url({});
        history.push(url);
      },
      here() {
        const url = path.url({});
        history.push(url);
      },
      user(userId: string) {
        const url = paths.user.url({ userId });
        history.replace(url);
      },
    }),
    [path, paths, origin, history]
  );

  const findPageRoutes = useMemo(
    () => ({
      cancel: routes.parent,
      user: routes.user,
    }),
    [routes]
  );

  return (
    <ViewStack>
      <FindPage routes={findPageRoutes} userId={userId} />
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

export default SearchUserRoutes;
