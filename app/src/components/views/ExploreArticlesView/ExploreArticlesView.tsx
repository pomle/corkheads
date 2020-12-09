import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import * as Locales from "./locales";
import { Article } from "types/Article";
import Input from "components/ui/input/Input/Input";
import ViewHead from "components/ui/layout/ViewHead";
import { ReactComponent as SearchIcon } from "assets/graphics/icons/magnifier.svg";
import Themer from "components/ui/theme/Themer";
import TextItem from "components/ui/layout/TextItem";
import ItemList from "components/ui/layout/ItemList";
import SearchArticleItem from "components/fragments/Article/SearchArticleItem";
import * as paths from "components/route/paths";
import LineThrobber from "components/ui/throbbers/LineThrobber";
import { Colors } from "components/ui/theme/themes";
import {
  ArticleSearchQuery,
  useArticleSearch,
} from "components/hooks/db/useArticleSearch";

const useStyles = makeStyles({
  ArticleSelect: {},
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

interface ExploreArticlesViewProps {
  nav: React.ReactNode;
  onSelect: (article: Article) => void;
}

const ExploreArticlesView: React.FC<ExploreArticlesViewProps> = ({
  nav,
  onSelect,
}) => {
  const createURL = useMemo(() => paths.articleCreate.url({}), []);

  const [query, setQuery] = useState<string>("");

  const executedQuery = query.length >= MIN_QUERY_LENGTH ? query : "";

  const searchQuery = useMemo(
    (): ArticleSearchQuery => ({
      search: {
        text: executedQuery,
      },
    }),
    [executedQuery]
  );

  const searchRequest = useArticleSearch(searchQuery);
  const articleEntries = searchRequest.results;

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
          <div className={classes.searchBusy}>
            {searchRequest.busy && <LineThrobber color={Colors.Gold} />}
          </div>
        </ViewCap>
      </Themer>
      <ViewBody>
        <div className={classes.searchResults}>
          {executedQuery.length ? (
            <ItemList>
              {articleEntries.map((entry) => {
                const article = entry.data;
                return (
                  <button key={article.id} onClick={() => onSelect(article)}>
                    <SearchArticleItem article={article} />
                  </button>
                );
              })}

              <TextItem>
                Can't find the drink you're looking for?{" "}
                <Link to={createURL}>Add it!</Link>
              </TextItem>
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

export default ExploreArticlesView;
