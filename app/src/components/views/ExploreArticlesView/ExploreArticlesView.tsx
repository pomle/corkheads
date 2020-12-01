import React from "react";
import { makeStyles } from "@material-ui/styles";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import * as Locales from "./locales";
import { Article } from "types/Article";
import { useSharedInput } from "components/hooks/useSharedInput";
import SearchInput from "components/ui/input/SearchInput";
import ArticleResults from "components/fragments/Article/ArticleResults";
import ResultStatement from "components/ui/typography/ResultStatement";
import ViewHead from "components/ui/layout/ViewHead";

const MIN_QUERY_LENGTH = 3;

const useStyles = makeStyles({
  ArticleSelect: {},
  searchBar: {
    margin: "24px",
  },
  searchResults: {},
});

interface ExploreArticlesViewProps {
  nav: React.ReactNode;
  onSelect: (article: Article) => void;
}

const ExploreArticlesView: React.FC<ExploreArticlesViewProps> = ({
  nav,
  onSelect,
}) => {
  const [query, setQuery] = useSharedInput("site-select-query", "");

  const classes = useStyles();

  return (
    <HeaderLayout>
      <ViewCap top>
        {nav}
        <ViewHead>
          <h1>
            <Locales.FindDrink />
          </h1>
        </ViewHead>
      </ViewCap>
      <ViewBody>
        <div className={classes.searchBar}>
          <SearchInput query={query} onQueryChange={setQuery} />
        </div>
        <div className={classes.searchResults}>
          {query.length >= MIN_QUERY_LENGTH ? (
            <ArticleResults query={query} onSelect={onSelect} />
          ) : (
            <ResultStatement message="Type in the name of a drink or manufacturer." />
          )}
        </div>
      </ViewBody>
    </HeaderLayout>
  );
};

export default ExploreArticlesView;
