import React, { useMemo } from "react";
import ItemList from "components/ui/layout/ItemList";
import ItemListItem from "components/ui/layout/ItemListItem";
import CaptionedPair from "components/ui/typography/CaptionedPair";
import ResultStatement from "components/ui/typography/ResultStatement";
import { useArticles } from "components/hooks/db/useArticles";
import { Article } from "types/types";

interface ArticleResultsProps {
  query: string;
  onSelect: (article: Article) => void;
}

const ArticleResults: React.FC<ArticleResultsProps> = ({
  query,
  onSelect
}) => {
  const searchQuery = useMemo(() => ({
    search: {
      text: query,
    }
  }), [query]);

  const result = useArticles(searchQuery);

  if (result.busy) {
    return <ResultStatement message="Searching..." />;
  }

  if (!result.data) {
    return <ResultStatement message="Nothing found." />;
  }

  const articles = result.data;

  return (
    <ItemList>
      {articles.map(article => {
        return (
          <ItemListItem key={article.id} onClick={() => onSelect(article)}>
            <CaptionedPair
              primary={article.data.displayName}
              secondary={article.id}
            />
          </ItemListItem>
        );
      })}
    </ItemList>
  );
};

export default ArticleResults;
