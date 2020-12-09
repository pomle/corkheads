import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import ItemList from "components/ui/layout/ItemList";
import {
  ArticleSearchQuery,
  useArticleSearch,
} from "components/hooks/db/useArticleSearch";
import { Article } from "types/Article";
import * as paths from "components/route/paths";
import SearchArticleItem from "./components/SearchArticleItem";
import TextItem from "./components/TextItem";
import LineThrobber from "components/ui/throbbers/LineThrobber";

interface ArticleResultsProps {
  query: string;
  onSelect: (article: Article) => void;
}

const ArticleResults: React.FC<ArticleResultsProps> = ({ query, onSelect }) => {
  const createURL = useMemo(() => paths.articleCreate.url({}), []);

  const searchQuery = useMemo(
    (): ArticleSearchQuery => ({
      search: {
        text: query,
      },
    }),
    [query]
  );

  const searchRequest = useArticleSearch(searchQuery);

  const articles = searchRequest.results.reduce((articles, entry) => {
    if (entry.data) {
      articles.push(entry.data);
    }
    return articles;
  }, [] as Article[]);

  return (
    <>
      {searchRequest.busy && <LineThrobber />}
      <ItemList>
        {articles.map((article) => {
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
    </>
  );
};

export default ArticleResults;
