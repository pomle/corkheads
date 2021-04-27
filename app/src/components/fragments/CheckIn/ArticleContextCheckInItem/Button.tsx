import React from "react";
import ArticleContextCheckInItem from "components/fragments/CheckIn/ArticleContextCheckInItem";
import { CheckInPointer } from "components/hooks/db/useCheckInQuery";
import { useCheckInRoute } from "components/route/paths";

interface ArticleContextCheckInItemButtonProps {
  pointer: CheckInPointer;
}

const ArticleContextCheckInItemButton: React.FC<ArticleContextCheckInItemButtonProps> = React.memo(
  ({ pointer }) => {
    const goToCheckIn = useCheckInRoute();

    return (
      <button onClick={() => goToCheckIn(pointer.checkInId)}>
        <ArticleContextCheckInItem pointer={pointer} />
      </button>
    );
  }
);

export default ArticleContextCheckInItemButton;
