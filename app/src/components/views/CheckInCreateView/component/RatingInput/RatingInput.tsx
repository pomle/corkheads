import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as Star } from "assets/graphics/icons/star.svg";
import { Colors } from "components/ui/theme/themes";
import { Rating, VALID_SCORE } from "types/Rating";

const LOVE_DELAY_MS = 1000;

type StyleProps = {
  canLove: boolean;
  hold: boolean;
};

const useStyles = makeStyles({
  "@keyframes heartbeat": {
    "0%": {
      transform: "scale(1)",
    },
    "100%": {
      transform: "scale(1.5)",
    },
  },
  RatingInput: {
    "& .score": {
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
        "&.score-5": {
          transform: (props: StyleProps) =>
            props.hold ? "scale(1.5)" : "none",
          transition: "transform ease-out",
          transitionDuration: (props: StyleProps) =>
            props.hold ? `${LOVE_DELAY_MS}ms` : "200ms",
        },
      },
    },
    "& button.love": {
      display: (props: StyleProps) => (props.canLove ? "initial" : "none"),
      filter: "grayscale(1) opacity(0.3)",
      fontSize: "60px",
      transition: "filter 0.2s ease",
      "&.active": {
        animation: "$heartbeat 2000ms ease infinite alternate",
        filter: "none",
        pointerEvents: "none", // Button may cover when pulsating
      },
    },
  },
});

interface RatingInputProps {
  rating: Rating;
  onChange: (rating: Rating) => void;
}

const RatingInput: React.FC<RatingInputProps> = ({ rating, onChange }) => {
  const [hold, setHold] = useState<boolean>(false);
  const [canLove, setCanLove] = useState<boolean>(false);

  useEffect(() => {
    if (hold) {
      const timer = setTimeout(() => {
        setHold(false);
        setCanLove(true);
      }, LOVE_DELAY_MS);
      return () => clearTimeout(timer);
    }
  }, [hold]);

  const setScore = useCallback(
    (score: number) => {
      onChange({ ...rating, score, love: false });
    },
    [rating, onChange]
  );

  const setLove = useCallback(
    (love: boolean) => {
      onChange({ ...rating, love });
    },
    [rating, onChange]
  );

  const handlePoint = useCallback(
    (point: number) => {
      setScore(point);
      if (point === 5) {
        setHold(true);
      }
      if (point < 5) {
        setCanLove(false);
      }
    },
    [setHold, setScore]
  );

  const handleRelease = useCallback(() => {
    setHold(false);
  }, [setHold]);

  const score = rating.score || 0;

  const classes = useStyles({ canLove, hold });

  return (
    <div className={classes.RatingInput}>
      <div className="score">
        {VALID_SCORE.map((point) => (
          <button
            key={point}
            className={`star ${
              score >= point ? "filled" : "empty"
            } score-${point}`}
            onPointerDown={() => handlePoint(point)}
            onContextMenu={(event) => event.preventDefault()}
            onPointerOut={handleRelease}
          >
            <Star />
          </button>
        ))}
      </div>
      <div className="love">
        <button
          type="button"
          className={`love ${rating.love ? "active" : "inactive"}`}
          onPointerDown={() => setLove(true)}
        >
          💖
        </button>
      </div>
    </div>
  );
};

export default RatingInput;
