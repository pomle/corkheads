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

  const articles = result.data;

  if (!articles || articles.length === 0) {
    return <ResultStatement message="Nothing found." />;
  }



  return (
    <ItemList>
      {articles.map(article => {
        return (
          <ItemListItem key={article.id} onClick={() => onSelect(article)}>
            <CaptionedPair
              primary={article.data.displayName}
              secondary={article.data.manufacturer}
            />
          </ItemListItem>
        );
      })}
    </ItemList>
  );
};

export default ArticleResults;
