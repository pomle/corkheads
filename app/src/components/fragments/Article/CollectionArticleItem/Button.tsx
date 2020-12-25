import React from "react";
import CollectionArticleItem from ".";

interface CollectionArticleItemButtonProps {
  pointer: { articleId: string; userId: string };
  route: (articleId: string) => void;
}

const CollectionArticleItemButton: React.FC<CollectionArticleItemButtonProps> = React.memo(
  ({ pointer, route }) => {
    return (
      <button onClick={() => route(pointer.articleId)}>
        <CollectionArticleItem pointer={pointer} />
      </button>
    );
  }
);

export default CollectionArticleItemButton;
