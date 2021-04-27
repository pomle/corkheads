import React from "react";
import TopArticleItem from ".";

interface TopArticleItemButtonProps {
  pointer: { articleId: string; userId: string };
  toArticle: (articleId: string) => void;
}

const TopArticleItemButton: React.FC<TopArticleItemButtonProps> = React.memo(
  ({ pointer, toArticle }) => {
    return (
      <button onClick={() => toArticle(pointer.articleId)}>
        <TopArticleItem pointer={pointer} />
      </button>
    );
  }
);

export default TopArticleItemButton;
