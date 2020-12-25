import React from "react";
import WishlistArticleItem from ".";

interface WishlistArticleItemButtonProps {
  pointer: { articleId: string };
  route: (articleId: string) => void;
}

const WishlistArticleItemButton: React.FC<WishlistArticleItemButtonProps> = React.memo(
  ({ pointer, route }) => {
    return (
      <button onClick={() => route(pointer.articleId)}>
        <WishlistArticleItem pointer={pointer} />
      </button>
    );
  }
);

export default WishlistArticleItemButton;
