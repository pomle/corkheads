import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as Star } from "assets/graphics/icons/star.svg";
import { Theme } from "components/ui/theme/themes";
import { Colors } from "components/ui/theme/colors";
import { VALID_SCORE } from "types/Rating";

function getEmptyColor() {
  return Colors.X2;
}

function getFilledColor() {
  return Colors.Gold;
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
            fill: getEmptyColor(),
          },
        },
        "&.filled": {
          "& svg path": {
            fill: getFilledColor(),
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
