import React, { useCallback, useRef } from "react";
import { SlideRight } from "components/ui/transitions/Slide";
import ProfilePage from "./pages/ProfilePage";
import { useMe } from "components/hooks/useMe";
import BusyView from "components/views/BusyView";
import { paths as rootPaths } from "components/route/paths";
import { useScreen } from "components/context/ScreenContext";
import UserView from "components/views/UserView";
import ArticleDetailsView from "components/views/ArticleDetailsView";
import CheckInDetailsView from "components/views/CheckInDetailsView";

const HomeRoutes: React.FC = () => {
  const element = useRef<React.ReactElement>();

  const user = useMe();

  useScreen({
    path: () => rootPaths.article,
    render: ({ articleId }) => {
      if (!user) {
        return <>{null}</>;
      }

      return <ArticleDetailsView userId={user.id} articleId={articleId} />;
    },
    transition: SlideRight,
  });

  useScreen({
    path: () => rootPaths.checkIn,
    render: ({ checkInId }) => <CheckInDetailsView checkInId={checkInId} />,
    transition: SlideRight,
  });

  useScreen({
    path: () => rootPaths.user,
    render: ({ userId }) => <UserView userId={userId} />,
    transition: SlideRight,
  });

  if (user) {
    element.current = <ProfilePage userId={user.id} />;
  }

  if (!element.current) {
    return <BusyView />;
  }

  return element.current;
};

export default HomeRoutes;
