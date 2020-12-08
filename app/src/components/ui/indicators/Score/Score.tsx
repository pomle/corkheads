import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as Star } from "assets/graphics/icons/star.svg";
import { Colors, Theme } from "components/ui/theme/themes";
import { VALID_SCORE } from "types/Rating";

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
    Score: {
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

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score: given }) => {
  const classes = useStyles();

  return (
    <div className={classes.Score}>
      {VALID_SCORE.map((score) => {
        return (
          <div
            key={score}
            className={given >= score ? "star filled" : "star empty"}
          >
            <Star />
          </div>
        );
      })}
    </div>
  );
};

export default Score;
