import React from "react";
import ViewTitle from "components/ui/layout/ViewTitle";
//import VehicleSelect from "components/fragments/Vehicle/VehicleSelect";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import * as Locales from "./locales";
import ArticleSelect from "components/fragments/Article/ArticleSelect";
import { Article } from "types/types";

interface ExploreArticlesViewProps {
    onSelect: (article: Article) => void;
}

const ExploreArticlesView: React.FC<ExploreArticlesViewProps> = ({
    onSelect
}) => {
  return (
    <HeaderLayout>
      <ViewCap top>

        <ViewTitle title={<Locales.FindDrink />} />
      </ViewCap>
      <ViewBody>
      <ArticleSelect onSelect={onSelect} />
      </ViewBody>
    </HeaderLayout>
  );
};

export default ExploreArticlesView;
