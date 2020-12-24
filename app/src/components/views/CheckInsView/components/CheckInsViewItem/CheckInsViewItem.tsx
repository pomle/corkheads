import React from "react";
import { Article } from "types/Article";
import { CheckIn } from "types/CheckIn";
import CheckInItem from "../CheckInItem";

const FALLBACK_ARTICLE: Article = {
  id: "404",
  displayName: "Unknown",
};

interface CheckInsViewItemProps {
  checkIn: CheckIn;
  article?: Article;
  onClick: (checkInId: string) => void;
}

const CheckInsViewItem: React.FC<CheckInsViewItemProps> = ({
  checkIn,
  article,
  onClick,
}) => {
  return (
    <button key={checkIn.id} onClick={() => onClick(checkIn.id)}>
      <CheckInItem checkIn={checkIn} article={article || FALLBACK_ARTICLE} />
    </button>
  );
};

export default CheckInsViewItem;