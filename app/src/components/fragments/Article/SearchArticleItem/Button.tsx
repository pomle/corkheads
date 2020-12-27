import React from "react";
import { ArticleHit } from "components/hooks/db/useOmniSearch";
import SearchArticleItem from ".";

interface SearchArticleItemButtonProps {
  result: ArticleHit;
  userId: string;
  route: (articleId: string) => void;
}

const SearchArticleItemButton: React.FC<SearchArticleItemButtonProps> = React.memo(
  ({ userId, result, route }) => {
    return (
      <button onClick={() => route(result.articleId)}>
        <SearchArticleItem userId={userId} result={result} />
      </button>
    );
  }
);

export default SearchArticleItemButton;
