import React from "react";
import { makeStyles } from "@material-ui/styles";
import Score from "components/ui/indicators/Score";
import { Theme } from "components/ui/theme/themes";
import { Rating } from "types/Rating";
import { RatingAggregate as Aggregate } from "types/RatingAggregate";
import RatingAggregate from "components/ui/indicators/RatingAggregate";
import { ReactComponent as HeartIcon } from "assets/graphics/icons/heart-filled.svg";

const useStyles = makeStyles((theme: Theme) => ({
  Rating: {
    alignItems: "center",
    display: "grid",
    gridAutoFlow: "column",
    gridGap: "4px",
    justifyContent: "flex-start",
    "& .love": {
      height: "1em",
      width: "1em",
    },
  },
}));

interface ItemRatingProps {
  rating?: Rating;
  aggregate?: Aggregate;
}

const ItemRating: React.FC<ItemRatingProps> = ({ rating, aggregate }) => {
  const classes = useStyles();

  if (aggregate && aggregate.count > 0) {
    return (
      <div className={classes.Rating}>
        <RatingAggregate ratingAggregate={aggregate} />
      </div>
    );
  }

  if (rating) {
    return (
      <div className={classes.Rating}>
        {rating?.love && <HeartIcon className="love" />}
        {rating?.score && <Score score={rating.score} />}
      </div>
    );
  }

  return null;
};

export default ItemRating;
