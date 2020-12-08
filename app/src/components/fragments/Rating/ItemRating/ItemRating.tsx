import React from "react";
import { makeStyles } from "@material-ui/styles";
import Score from "components/ui/indicators/Score";
import { Theme } from "components/ui/theme/themes";
import { Rating } from "types/Rating";
import { RatingAggregate as Aggregate } from "types/RatingAggregate";
import RatingAggregate from "components/ui/indicators/RatingAggregate";

const useStyles = makeStyles((theme: Theme) => ({
  Rating: {
    alignItems: "center",
    display: "flex",
    fontSize: "10px",
    margin: "-4px",
    "& > *": {
      margin: "4px",
    },
  },
}));

interface ItemRatingProps {
  rating?: Rating;
  aggregate?: Aggregate;
}

const ItemRating: React.FC<ItemRatingProps> = ({ rating, aggregate }) => {
  const classes = useStyles();

  if (aggregate) {
    return (
      <div className={classes.Rating}>
        <RatingAggregate ratingAggregate={aggregate} />
      </div>
    );
  }

  if (rating) {
    return (
      <div className={classes.Rating}>
        {rating?.love && <span>💖</span>}
        {rating?.score && <Score score={rating.score} />}
      </div>
    );
  }

  return null;
};

export default ItemRating;
