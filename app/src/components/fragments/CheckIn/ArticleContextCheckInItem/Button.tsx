import React from "react";
import ArticleContextCheckInItem from "components/fragments/CheckIn/ArticleContextCheckInItem";
import { CheckInPointer } from "components/hooks/db/useCheckInQuery";
import { useCheckInRoute } from "components/route/paths";

interface ArticleContextCheckInItemButtonProps {
  pointer: CheckInPointer;
  toCheckIn: ({ checkInId }: { checkInId: string }) => void;
}

const ArticleContextCheckInItemButton: React.FC<ArticleContextCheckInItemButtonProps> = React.memo(
  ({ pointer, toCheckIn }) => {
    return (
      <button onClick={() => toCheckIn({ checkInId: pointer.checkInId })}>
        <ArticleContextCheckInItem pointer={pointer} />
      </button>
    );
  }
);

export default ArticleContextCheckInItemButton;
