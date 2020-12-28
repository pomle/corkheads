import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import Input from "components/ui/input/Input/Input";
import ViewHead from "components/ui/layout/ViewHead";
import { ReactComponent as SearchIcon } from "assets/graphics/icons/magnifier.svg";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import TextItem from "components/ui/layout/TextItem";
import ItemList from "components/ui/layout/ItemList";
import SearchArticleItemButtom from "components/fragments/Article/SearchArticleItem/Button";
import LineThrobber from "components/ui/throbbers/LineThrobber";
import { useSearchHistory } from "components/hooks/db/useSearchHistory";
import SearchHistory from "./components/SearchHistory";
import * as Locales from "./locales";
import { SearchArea, SearchQuery } from "components/hooks/algolia";
import { useOmniSearch } from "components/hooks/db/useOmniSearch";
import { useQuery } from "components/hooks/useQuery";

const useStyles = makeStyles({
  searchBar: {
    marginTop: "12px",
  },
  searchBusy: {
    position: "relative",
    "& > *": {
      bottom: 0,
      height: "2px",
      position: "absolute",
      width: "100%",
    },
  },
  searchResults: {
    margin: "24px",
  },
});

const MIN_QUERY_LENGTH = 3;

interface SearchArticlesViewProps {
  nav: React.ReactNode;
  userId: string;
  routes: {
    article: (articleId: string) => void;
    createArticle: () => string;
  };
}

const SearchArticlesView: React.FC<SearchArticlesViewProps> = ({
  nav,
  userId,
  routes,
}) => {
  const [query, setQuery] = useQuery("query");

  const executedQuery = query.length >= MIN_QUERY_LENGTH ? query : "";

  const searchQuery = useMemo(
    (): SearchQuery => ({
      search: {
        text: executedQuery,
      },
      areas: SearchArea.Article,
      filters: {
        userIds: [userId],
      },
    }),
    [executedQuery, userId]
  );

  const request = useOmniSearch(searchQuery);

  const searchHistory = useSearchHistory(userId);

  const handleSelect = useCallback(
    (articleId: string) => {
      searchHistory.add({
        text: searchQuery.search.text,
      });
      routes.article(articleId);
    },
    [searchQuery, searchHistory, routes]
  );

  const classes = useStyles();

  return (
    <HeaderLayout>
      <ThemeProvider theme="dusk">
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
          <div className={classes.searchBusy}>
            {request.busy && <LineThrobber />}
          </div>
        </ViewCap>
      </ThemeProvider>
      <ViewBody>
        <div className={classes.searchResults}>
          {executedQuery.length ? (
            <ItemList divided>
              {request.results.article.map((result) => {
                return (
                  <SearchArticleItemButtom
                    userId={userId}
                    result={result}
                    route={handleSelect}
                  />
                );
              })}

              <TextItem>
                Can't find the drink you're looking for?{" "}
                <Link to={routes.createArticle}>Add it!</Link>
              </TextItem>
            </ItemList>
          ) : (
            <>
              <TextItem>
                Type at least {MIN_QUERY_LENGTH - query.length} more characters
                to search.
              </TextItem>
              <SearchHistory
                entries={searchHistory.entries}
                onSelect={setQuery}
              />
            </>
          )}
        </div>
      </ViewBody>
    </HeaderLayout>
  );
};

export default SearchArticlesView;
