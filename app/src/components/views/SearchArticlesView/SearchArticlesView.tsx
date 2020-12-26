import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import * as Locales from "./locales";
import Input from "components/ui/input/Input/Input";
import ViewHead from "components/ui/layout/ViewHead";
import { ReactComponent as SearchIcon } from "assets/graphics/icons/magnifier.svg";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import TextItem from "components/ui/layout/TextItem";
import ItemList from "components/ui/layout/ItemList";
import SearchArticleItemButtom from "components/fragments/Article/SearchArticleItem/Button";
import LineThrobber from "components/ui/throbbers/LineThrobber";
import { Colors } from "components/ui/theme/colors";
import {
  ArticleSearchQuery,
  useArticleSearch,
} from "components/hooks/db/useArticleSearch";
import { useSearchHistory } from "components/hooks/db/useSearchHistory";
import EntryList from "components/ui/layout/EntryList";
import PassedTime from "components/ui/format/PassedTime";

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
  const [query, setQuery] = useState<string>("");

  const executedQuery = query.length >= MIN_QUERY_LENGTH ? query : "";

  const searchQuery = useMemo(
    (): ArticleSearchQuery => ({
      search: {
        text: executedQuery,
      },
      filters: {
        userIds: [userId],
      },
    }),
    [executedQuery, userId]
  );

  const request = useArticleSearch(searchQuery);

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
            {request.busy && <LineThrobber color={Colors.MatteGold} />}
          </div>
        </ViewCap>
      </ThemeProvider>
      <ViewBody>
        <div className={classes.searchResults}>
          {executedQuery.length ? (
            <ItemList divided>
              {request.results.map((result) => {
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
              <EntryList>
                {searchHistory.entries.map((entry) => {
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => setQuery(entry.query.text)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "16px 0",
                        width: "100%",
                      }}
                    >
                      <div>{entry.query.text}</div>
                      <div>
                        {entry.timestamp && (
                          <PassedTime date={entry.timestamp} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </EntryList>
            </>
          )}
        </div>
      </ViewBody>
    </HeaderLayout>
  );
};

export default SearchArticlesView;
