import React from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import BusyView from "../BusyView";

interface LoadingViewProps {
  nav: React.ReactNode;
}

const LoadingView: React.FC<LoadingViewProps> = ({ nav, children }) => {
  return (
    <HeaderLayout>
      <ViewCap top>{nav}</ViewCap>
      <ViewBody>
        <BusyView>{children}</BusyView>
      </ViewBody>
    </HeaderLayout>
  );
};

export default LoadingView;
