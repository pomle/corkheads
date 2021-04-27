import React from "react";
import CollectionArticleItem from ".";

interface CollectionArticleItemButtonProps {
  pointer: { articleId: string; userId: string };
  toArticle: (articleId: string) => void;
}

const CollectionArticleItemButton: React.FC<CollectionArticleItemButtonProps> = React.memo(
  ({ pointer, toArticle }) => {
    return (
      <button onClick={() => toArticle(pointer.articleId)}>
        <CollectionArticleItem pointer={pointer} />
      </button>
    );
  }
);

export default CollectionArticleItemButton;
