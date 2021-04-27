import React from "react";
import WishlistArticleItem from ".";

interface WishlistArticleItemButtonProps {
  pointer: { articleId: string; userId: string };
  toArticle: (articleId: string) => void;
}

const WishlistArticleItemButton: React.FC<WishlistArticleItemButtonProps> = React.memo(
  ({ pointer, toArticle }) => {
    return (
      <button onClick={() => toArticle(pointer.articleId)}>
        <WishlistArticleItem pointer={pointer} />
      </button>
    );
  }
);

export default WishlistArticleItemButton;
