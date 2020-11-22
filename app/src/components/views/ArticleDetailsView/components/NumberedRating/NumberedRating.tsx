import React from "react";
import { makeStyles } from "@material-ui/styles";
import Rating from "components/ui/indicators/Rating";

const useStyles = makeStyles({
  NumberedRating: {
    display: "flex",
    lineHeight: 1,
  },
});

interface NumberedRatingProps {
  value: number;
  max: number;
}

const NumberedRating: React.FC<NumberedRatingProps> = ({ value, max }) => {
  const classes = useStyles();

  return (
    <div className={classes.NumberedRating}>
      <Rating rating={value / max} />
      <div>&nbsp;{value.toFixed(1)}</div>
    </div>
  );
};

export default NumberedRating;
