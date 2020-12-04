import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as Star } from "assets/graphics/icons/star.svg";
import { Colors } from "components/ui/theme/themes";
import { VALID_SCORE } from "types/Rating";

const useStyles = makeStyles({
  RatingInput: {
    display: "flex",
    justifyContent: "space-around",
    "& button": {
      "& svg": {
        height: "32px",
        width: "32px",
        "& path": {
          fill: "transparent",
          stroke: Colors.Gold,
          strokeWidth: "3px",
          transition: "fill 1s cubic-bezier(0, 0, 0.02, 0.98)",
        },
      },
      "&.filled": {
        "& svg path": {
          fill: Colors.Gold,
        },
      },
    },
  },
});

interface RatingInputProps {
  rating: number;
  onChange: (rating: number) => void;
}

const RatingInput: React.FC<RatingInputProps> = ({ rating, onChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.RatingInput}>
      {VALID_SCORE.map((r) => (
        <button
          key={r}
          className={rating >= r ? "star filled" : "star empty"}
          onClick={() => onChange(r)}
        >
          <Star />
        </button>
      ))}
    </div>
  );
};

export default RatingInput;
