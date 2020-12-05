import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as Star } from "assets/graphics/icons/star.svg";
import { Colors, Theme } from "components/ui/theme/themes";

function getEmptyColor(theme: Theme) {
  if (theme.color.surface === Colors.Milk) {
    return Colors.Cream;
  } else if (theme.color.surface === Colors.Navy) {
    return Colors.Milk + "30";
  }
  return Colors.Milk;
}

function getFilledColor(theme: Theme) {
  if (theme.color.surface === Colors.Milk) {
    return Colors.Gold;
  }
  return Colors.ShinyGold;
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    rating: {
      display: "inline-flex",
      justifyContent: "space-around",
      "& .star": {
        "& svg": {
          margin: "0.5px",
          height: "1em",
          width: "1em",
        },
        "&.empty": {
          "& svg path": {
            fill: getEmptyColor(theme),
          },
        },
        "&.filled": {
          "& svg path": {
            fill: getFilledColor(theme),
          },
        },
      },
    },
  };
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
            key={rating}
            className={score >= rating ? "star filled" : "star empty"}
          >
            <Star />
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
