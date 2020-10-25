import React from "react";
import ViewTitle from "components/ui/layout/ViewTitle";
//import VehicleSelect from "components/fragments/Vehicle/VehicleSelect";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import * as Locales from "./locales";

interface ExploreArticlesViewProps {
}

const ExploreArticlesView: React.FC<ExploreArticlesViewProps> = ({

}) => {
  return (
    <HeaderLayout>
      <ViewCap top>

        <ViewTitle title={<Locales.FindDrink />} />
      </ViewCap>
      <ViewBody>

      </ViewBody>
    </HeaderLayout>
  );
};

export default ExploreArticlesView;
