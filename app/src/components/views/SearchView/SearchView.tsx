import React, { useCallback, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import NavigationBar, { Nav } from "components/ui/layout/NavigationBar";
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
import CancelButton from "components/ui/trigger/CancelButton";
import NavButton from "components/ui/trigger/NavButton";
import {
  createPath,
  useBack,
  useScreen,
} from "components/context/ScreenContext";
import { ReactComponent as PlusIcon } from "assets/graphics/icons/plus.svg";
import { stringCodec } from "components/route/codecs";
import UserView from "../UserView";
import { SlideRight } from "components/ui/transitions/Slide";
import ArticleDetailsView from "../ArticleDetailsView";
import ArticleEditView from "../ArticleEditView";

const useStyles = makeStyles({
  searchBar: {
    marginTop: "-8px",
  },
  searchResults: {
    display: "grid",
    gridGap: "16px",
    padding: "16px",
  },
});

const MIN_QUERY_LENGTH = 3;

const articleCreatePath = createPath("/create-article", {});
const articlePath = createPath("/article/:articleId", {
  articleId: stringCodec,
});
const searchPath = createPath("/user/:userId", { userId: stringCodec });

interface SearchViewProps {
  userId: string;
}

const SearchView: React.FC<SearchViewProps> = ({ userId }) => {
  const goBack = useBack();

  const goToArticle = useScreen({
    path: articlePath,
    render: ({ articleId }) => (
      <ArticleDetailsView userId={userId} articleId={articleId} />
    ),
    transition: SlideRight,
  });

  const goToArticleCreate = useScreen({
    path: articleCreatePath,
    render: () => <ArticleEditView userId={userId} />,
    transition: SlideRight,
  });

  const goToUser = useScreen({
    path: searchPath,
    render: ({ userId }) => <UserView userId={userId} />,
    transition: SlideRight,
  });

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
      goToArticle({ articleId });
    },
    [searchQuery, searchHistory, goToArticle]
  );

  const classes = useStyles();

  return (
    <SearchLayout busy={request.busy}>
      <ThemeProvider theme="dusk">
        <ViewCap>
          <NavigationBar
            nav={{
              back: <CancelButton onClick={goBack}>Close</CancelButton>,
              forward: (
                <NavButton
                  icon={<PlusIcon />}
                  onClick={() => goToArticleCreate({})}
                >
                  Create
                </NavButton>
              ),
            }}
          />
          <ViewHead>
            <div className={classes.searchBar}>
              <Input
                symbol={<SearchIcon />}
                type="search"
                placeholder="ex. whisky or people"
                value={query}
                onChange={setQuery}
              />
            </div>
          </ViewHead>
        </ViewCap>
      </ThemeProvider>
      {executedQuery.length ? (
        <SectionList>
          <Section header={<h3>Whiskys</h3>}>
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
                    Create it!
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
                    following={following}
                    toUser={goToUser}
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
