import { SearchResult } from "components/hooks/db/useArticleSearch";
import React from "react";
import SearchArticleItem from ".";

interface SearchArticleItemButtonProps {
  result: SearchResult;
  route: (articleId: string) => void;
}

const SearchArticleItemButton: React.FC<SearchArticleItemButtonProps> = React.memo(
  ({ result, route }) => {
    return (
      <button onClick={() => route(result.articleId)}>
        <SearchArticleItem result={result} />
      </button>
    );
  }
);

export default SearchArticleItemButton;
