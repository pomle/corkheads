import React, { useMemo } from "react";
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
import LineThrobber from "components/ui/throbbers/LineThrobber";
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
    <HeaderLayout>
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
          <div className={classes.searchBusy}>
            {request.busy && <LineThrobber />}
          </div>
        </ViewCap>
      </ThemeProvider>
      <ViewBody>
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
      </ViewBody>
    </HeaderLayout>
  );
};

export default SearchUsersView;
