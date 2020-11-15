import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import ItemList from "components/ui/layout/ItemList";
import ResultStatement from "components/ui/typography/ResultStatement";
import { useArticleSearch } from "components/hooks/db/useArticles";
import { Article } from "types/article";
import * as paths from "components/route/paths";
import SearchArticleItem from "./components/SearchArticleItem";
import TextItem from "./components/TextItem";

interface ArticleResultsProps {
  query: string;
  onSelect: (article: Article) => void;
}

const ArticleResults: React.FC<ArticleResultsProps> = ({ query, onSelect }) => {
  const createURL = useMemo(() => paths.articleCreate.url({}), []);

  const searchQuery = useMemo(
    () => ({
      search: {
        text: query,
      },
    }),
    [query]
  );

  const result = useArticleSearch(searchQuery);

  if (result.busy) {
    return <ResultStatement message="Searching..." />;
  }

  const articles = result.data;

  return (
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
  );
};

export default ArticleResults;
