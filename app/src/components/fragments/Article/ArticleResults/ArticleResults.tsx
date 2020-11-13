import React, { useMemo } from "react";
import ItemList from "components/ui/layout/ItemList";
import ResultStatement from "components/ui/typography/ResultStatement";
import { useArticleSearch } from "components/hooks/db/useArticles";
import { Article } from "types/types";
import ArticleItem from "components/views/ExploreArticlesView/components/ArticleItem/ArticleItem";

interface ArticleResultsProps {
  query: string;
  onSelect: (article: Article) => void;
}

const ArticleResults: React.FC<ArticleResultsProps> = ({ query, onSelect }) => {
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

  if (articles && articles.length === 0) {
    return <ResultStatement message="Nothing found." />;
  }

  return (
    <ItemList>
      {articles.map((article) => {
        return (
          <button onClick={() => onSelect(article)}>
            <ArticleItem key={article.id} article={article} />
          </button>
        );
      })}
    </ItemList>
  );
};

export default ArticleResults;
