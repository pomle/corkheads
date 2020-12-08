import React from "react";
import { RatingAggregate as RA } from "types/RatingAggregate";
import Score from "../Score";

interface RatingAggregateProps {
  ratingAggregate?: RA;
}

const RatingAggregate: React.FC<RatingAggregateProps> = ({
  ratingAggregate,
}) => {
  if (ratingAggregate) {
    const score = ratingAggregate.sum / ratingAggregate.count;
    return <Score score={score} />;
  }

  return <>-</>;
};

export default RatingAggregate;
