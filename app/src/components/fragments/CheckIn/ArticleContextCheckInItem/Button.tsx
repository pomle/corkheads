import React from "react";
import ArticleContextCheckInItem from "components/fragments/CheckIn/ArticleContextCheckInItem";
import { CheckInPointer } from "components/hooks/db/useCheckInQuery";

interface ArticleContextCheckInItemButtonProps {
  pointer: CheckInPointer;
  route: (checkInId: string) => void;
}

const ArticleContextCheckInItemButton: React.FC<ArticleContextCheckInItemButtonProps> = React.memo(
  ({ pointer, route }) => {
    return (
      <button onClick={() => route(pointer.checkInId)}>
        <ArticleContextCheckInItem pointer={pointer} />
      </button>
    );
  }
);

export default ArticleContextCheckInItemButton;
