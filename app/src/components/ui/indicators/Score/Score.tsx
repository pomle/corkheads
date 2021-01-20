import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as Star } from "assets/graphics/icons/star.svg";
import { Theme } from "components/ui/theme/themes";
import { Colors } from "components/ui/theme/colors";
import { VALID_SCORE } from "types/Rating";

const OUTLINE = new Set([Colors.BlueSmoke, Colors.Navy]);

function getFilledColor(theme: Theme) {
  return theme.color.action;
}

function getEmptyColor(theme: Theme) {
  return theme.color.panel;
}

const useStyles = makeStyles((theme: Theme) => {
  const filledColor = getFilledColor(theme);
  const emptyColor = getEmptyColor(theme);

  return {
    Score: {
      alignItems: "center",
      display: "grid",
      gridAutoFlow: "column",
      "& .star": {
        "& svg": {
          display: "block",
          height: "1em",
          width: "1em",
        },
        "&.empty": {
          "& path": {
            fill: () => {
              if (OUTLINE.has(theme.color.surface)) {
                return "none";
              }
              return emptyColor;
            },
            stroke: () => {
              if (OUTLINE.has(theme.color.surface)) {
                return filledColor;
              }
              return "none";
            },
            strokeWidth: "4px",
          },
        },
        "&.filled": {
          "& path": {
            fill: filledColor,
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
