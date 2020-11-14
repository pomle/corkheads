import React from "react";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import * as Locales from "./locales";
import ArticleSelect from "components/fragments/Article/ArticleSelect";
import { Article } from "types/article";

interface ExploreArticlesViewProps {
  nav: React.ReactNode;
  onSelect: (article: Article) => void;
}

const ExploreArticlesView: React.FC<ExploreArticlesViewProps> = ({
  nav,
  onSelect,
}) => {
  return (
    <HeaderLayout>
      <ViewCap top>
        {nav}
        <ViewTitle title={<Locales.FindDrink />} />
      </ViewCap>
      <ViewBody>
        <ArticleSelect onSelect={onSelect} />
      </ViewBody>
    </HeaderLayout>
  );
};

export default ExploreArticlesView;
