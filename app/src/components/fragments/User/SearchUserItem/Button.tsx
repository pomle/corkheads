import React from "react";
import { SearchResult } from "components/hooks/db/useUserSearch";
import SearchUserItem from ".";

interface SearchUserItemButtonProps {
  result: SearchResult;
  route: (userId: string) => void;
}

const SearchUserItemButton: React.FC<SearchUserItemButtonProps> = React.memo(
  ({ result, route }) => {
    return (
      <button onClick={() => route(result.userId)}>
        <SearchUserItem result={result} />
      </button>
    );
  }
);

export default SearchUserItemButton;
