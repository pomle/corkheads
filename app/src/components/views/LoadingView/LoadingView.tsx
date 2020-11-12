import React from "react";
import ViewBody from "components/ui/layout/ViewBody";
import BusyView from "../BusyView";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";

interface LoadingViewProps {
  nav: React.ReactNode;
}

const LoadingView: React.FC<LoadingViewProps> = ({ nav, children }) => {
  return (
    <FullScreenLayout>
      <ViewBody>
        {nav}
        <BusyView>{children}</BusyView>
      </ViewBody>
    </FullScreenLayout>
  );
};

export default LoadingView;
