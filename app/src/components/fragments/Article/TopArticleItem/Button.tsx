import React from "react";
import TopArticleItem from ".";

interface TopArticleItemButtonProps {
  pointer: { articleId: string; userId: string };
  route: (articleId: string) => void;
}

const TopArticleItemButton: React.FC<TopArticleItemButtonProps> = React.memo(
  ({ pointer, route }) => {
    return (
      <button onClick={() => route(pointer.articleId)}>
        <TopArticleItem pointer={pointer} />
      </button>
    );
  }
);

export default TopArticleItemButton;
