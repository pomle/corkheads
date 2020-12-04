import React from "react";
import { makeStyles } from "@material-ui/styles";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import * as Locales from "./locales";
import { Article } from "types/Article";
import { useSharedInput } from "components/hooks/useSharedInput";
import Input from "components/ui/input/Input/Input";
import ArticleResults from "components/fragments/Article/ArticleResults";
import ViewHead from "components/ui/layout/ViewHead";
import { ReactComponent as SearchIcon } from "assets/graphics/icons/magnifier.svg";
import Themer from "components/ui/theme/Themer";

const MIN_QUERY_LENGTH = 3;

const useStyles = makeStyles({
  ArticleSelect: {},
  searchBar: {
    marginTop: "12px",
  },
  searchResults: {
    margin: "24px",
  },
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
      <Themer theme="dusk">
        <ViewCap>
          {nav}
          <ViewHead>
            <h1>
              <Locales.FindDrink />
            </h1>
            <div className={classes.searchBar}>
              <Input
                symbol={<SearchIcon />}
                type="search"
                placeholder="Enter a whisky or brand"
                value={query}
                onChange={setQuery}
              />
            </div>
          </ViewHead>
        </ViewCap>
      </Themer>
      <ViewBody>
        <div className={classes.searchResults}>
          {query.length >= MIN_QUERY_LENGTH && (
            <ArticleResults query={query} onSelect={onSelect} />
          )}
        </div>
      </ViewBody>
    </HeaderLayout>
  );
};

export default ExploreArticlesView;
