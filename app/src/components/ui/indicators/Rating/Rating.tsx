import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  rating: {
    display: "inline-flex",
    fontSize: "10px",
    justifyContent: "space-around",
  },
});

interface RatingProps {
  rating: number;
}

const SCALE = 5;
const RATINGS = [1, 2, 3, 4, 5];

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const classes = useStyles();

  const score = Math.floor(rating * SCALE);

  return (
    <div className={classes.rating}>
      {RATINGS.map((rating) => {
        return (
          <div
            style={{
              filter: score >= rating ? "grayscale(0%)" : "grayscale(100%)",
            }}
            key={rating}
          >
            ⭐
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
