import React from "react";
import ViewBody from "components/ui/layout/ViewBody";
import BusyView from "../BusyView";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";
import NavigationBar, { Nav } from "components/ui/layout/NavigationBar";

interface LoadingViewProps {
  nav: Nav;
}

const LoadingView: React.FC<LoadingViewProps> = ({ nav, children }) => {
  return (
    <FullScreenLayout>
      <ViewBody>
        <NavigationBar nav={nav} />
        <BusyView>{children}</BusyView>
      </ViewBody>
    </FullScreenLayout>
  );
};

export default LoadingView;
