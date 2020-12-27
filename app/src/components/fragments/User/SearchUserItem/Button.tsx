import React from "react";
import SearchUserItem from ".";

interface SearchUserItemButtonProps {
  pointer: { userId: string };
  route: (userId: string) => void;
}

const SearchUserItemButton: React.FC<SearchUserItemButtonProps> = React.memo(
  ({ pointer, route }) => {
    return (
      <button onClick={() => route(pointer.userId)}>
        <SearchUserItem pointer={pointer} />
      </button>
    );
  }
);

export default SearchUserItemButton;
