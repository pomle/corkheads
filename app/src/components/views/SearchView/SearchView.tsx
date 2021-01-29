import React, { useCallback, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import ViewCap from "components/ui/layout/ViewCap";
import Input from "components/ui/input/Input/Input";
import ViewHead from "components/ui/layout/ViewHead";
import { ReactComponent as SearchIcon } from "assets/graphics/icons/magnifier.svg";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import TextItem from "components/ui/layout/TextItem";
import ItemList from "components/ui/layout/ItemList";
import SearchArticleItemButtom from "components/fragments/Article/SearchArticleItem/Button";
import { useSearchHistory } from "components/hooks/db/useSearchHistory";
import SearchHistory from "./components/SearchHistory";
import { SearchArea, SearchQuery } from "components/hooks/algolia";
import { useOmniSearch } from "components/hooks/db/useOmniSearch";
import SearchLayout from "components/ui/layout/SearchLayout";
import SectionList from "components/ui/layout/SectionList";
import Section from "components/ui/layout/Section";
import SearchUserItem from "components/fragments/User/SearchUserItem";
import { useFollowing } from "components/hooks/db/useFollowing";

const useStyles = makeStyles({
  searchBar: {
    marginTop: "12px",
  },
  searchResults: {
    margin: "24px",
  },
});

const MIN_QUERY_LENGTH = 3;

interface SearchViewProps {
  nav: React.ReactNode;
  userId: string;
  routes: {
    createArticle: () => void;
    article: (articleId: string) => void;
    user: (userId: string) => void;
  };
}

const SearchView: React.FC<SearchViewProps> = ({ nav, userId, routes }) => {
  const [query, setQuery] = useState<string>("");

  const executedQuery = query.length >= MIN_QUERY_LENGTH ? query : "";

  const searchQuery = useMemo(
    (): SearchQuery => ({
      search: {
        text: executedQuery,
      },
      areas: SearchArea.Article + SearchArea.User,
      filters: {
        userIds: [userId],
      },
    }),
    [executedQuery, userId]
  );

  const request = useOmniSearch(searchQuery);

  const following = useFollowing(userId);
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
    <SearchLayout busy={request.busy}>
      <ThemeProvider theme="dusk">
        <ViewCap>
          {nav}
          <ViewHead>
            <div className={classes.searchBar}>
              <Input
                symbol={<SearchIcon />}
                type="search"
                placeholder="ex. article or user"
                value={query}
                onChange={setQuery}
              />
            </div>
          </ViewHead>
        </ViewCap>
      </ThemeProvider>
      {executedQuery.length ? (
        <SectionList>
          <Section header={<h3>Articles</h3>}>
            <ItemList divided>
              {request.results.article.map((result) => {
                return (
                  <SearchArticleItemButtom
                    key={result.articleId}
                    userId={userId}
                    result={result}
                    route={handleSelect}
                  />
                );
              })}
              {request.results.article.length < 3 && (
                <TextItem>
                  Can't find the drink you're looking for?{" "}
                  <button type="button" onClick={routes.createArticle}>
                    Add it!
                  </button>
                </TextItem>
              )}
            </ItemList>
          </Section>

          <Section header={<h3>People</h3>}>
            <ItemList divided>
              {request.results.user.map((result) => {
                return (
                  <SearchUserItem
                    key={result.userId}
                    pointer={result}
                    routes={routes}
                    following={following}
                  />
                );
              })}
              {request.results.user.length === 0 && (
                <TextItem>No friends found for query.</TextItem>
              )}
            </ItemList>
          </Section>
        </SectionList>
      ) : (
        <div className={classes.searchResults}>
          <TextItem>
            Type at least {MIN_QUERY_LENGTH - query.length} more characters to
            search.
          </TextItem>
          <SearchHistory entries={searchHistory.entries} onSelect={setQuery} />
        </div>
      )}
    </SearchLayout>
  );
};

export default SearchView;
