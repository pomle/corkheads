import { SearchResult } from "components/hooks/db/useArticleSearch";
import React from "react";
import SearchArticleItem from ".";

interface SearchArticleItemButtonProps {
  result: SearchResult;
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
