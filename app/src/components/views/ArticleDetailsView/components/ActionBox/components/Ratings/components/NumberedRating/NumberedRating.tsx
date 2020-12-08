import React from "react";
import { makeStyles } from "@material-ui/styles";
import Score from "components/ui/indicators/Score";
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
      <Score score={value} />
    </div>
  );
};

export default NumberedRating;
