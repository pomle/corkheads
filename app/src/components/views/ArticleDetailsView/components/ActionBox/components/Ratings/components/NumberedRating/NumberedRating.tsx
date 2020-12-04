import React from "react";
import { makeStyles } from "@material-ui/styles";
import Rating from "components/ui/indicators/Rating";
import Number from "components/ui/format/Number";

const useStyles = makeStyles({
  NumberedRating: {
    alignItems: "center",
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
      <div>
        <Number value={value} decimals={1} />
        &nbsp;
      </div>
      <Rating rating={value / max} />
    </div>
  );
};

export default NumberedRating;
