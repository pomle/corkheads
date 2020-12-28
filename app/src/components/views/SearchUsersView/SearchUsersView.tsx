import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/styles";
import SearchLayout from "components/ui/layout/SearchLayout";
import ViewCap from "components/ui/layout/ViewCap";
import Input from "components/ui/input/Input/Input";
import ViewHead from "components/ui/layout/ViewHead";
import { ReactComponent as SearchIcon } from "assets/graphics/icons/magnifier.svg";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import TextItem from "components/ui/layout/TextItem";
import ItemList from "components/ui/layout/ItemList";
import * as Locales from "./locales";
import { SearchArea, SearchQuery } from "components/hooks/algolia";
import { useOmniSearch } from "components/hooks/db/useOmniSearch";
import { useQuery } from "components/hooks/useQuery";
import { useFollowing } from "components/hooks/db/useFollowing";
import SearchUserItem from "components/fragments/User/SearchUserItem";

const useStyles = makeStyles({
  searchBar: {
    marginTop: "12px",
  },
  searchResults: {
    margin: "24px",
  },
});

const MIN_QUERY_LENGTH = 1;

interface SearchUsersViewProps {
  nav: React.ReactNode;
  userId: string;
  routes: {
    user: (userId: string) => void;
  };
}

const SearchUsersView: React.FC<SearchUsersViewProps> = ({
  nav,
  routes,
  userId,
}) => {
  const [query, setQuery] = useQuery("query");

  const executedQuery = query.length >= MIN_QUERY_LENGTH ? query : "";

  const searchQuery = useMemo(
    (): SearchQuery => ({
      search: {
        text: executedQuery,
      },
      areas: SearchArea.User,
    }),
    [executedQuery]
  );

  const request = useOmniSearch(searchQuery);

  const following = useFollowing(userId);

  const classes = useStyles();

  return (
    <SearchLayout busy={request.busy}>
      <ThemeProvider theme="dusk">
        <ViewCap>
          {nav}
          <ViewHead>
            <h1>
              <Locales.FindFriend />
            </h1>
            <div className={classes.searchBar}>
              <Input
                symbol={<SearchIcon />}
                type="search"
                placeholder="Search for friends"
                value={query}
                onChange={setQuery}
              />
            </div>
          </ViewHead>
        </ViewCap>
      </ThemeProvider>
      <div className={classes.searchResults}>
        {executedQuery.length ? (
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
          </ItemList>
        ) : (
          <TextItem>
            Type at least {MIN_QUERY_LENGTH - query.length} more characters to
            search.
          </TextItem>
        )}
      </div>
    </SearchLayout>
  );
};

export default SearchUsersView;
