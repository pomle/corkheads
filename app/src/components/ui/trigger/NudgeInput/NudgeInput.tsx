import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as DecreaseIcon } from "./assets/minus.svg";
import { ReactComponent as IncreaseIcon } from "./assets/plus.svg";

interface StyleProps {
  expanded: boolean;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    border: "solid 1px #999999",
    justifyContent: "space-around",
    transition: "width 0.3s ease",
    width: (props: StyleProps) => (props.expanded ? 112 : 40),
    "& > *": {
      alignItems: "center",
      display: "flex",
      flex: "1 1",
      justifyContent: "center"
    }
  },
  button: {
    flex: "36px",
    opacity: (props: StyleProps) => (props.expanded ? 1 : 0),
    pointerEvents: (props: StyleProps) => (props.expanded ? "all" : "none"),
    transition: "opacity 0.3s ease"
  },
  value: {
    flex: "40px",
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 0,
    height: 40,
    width: 40
  }
});

interface NudgeInputProps {
  expanded: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
}

const NudgeInput: React.FC<NudgeInputProps> = ({
  children,
  expanded,
  onDecrease,
  onIncrease
}) => {
  const classes = useStyles({ expanded });

  return (
    <div className={classes.root}>
      <button type="button" onClick={onDecrease} className={classes.button}>
        <DecreaseIcon />
      </button>
      <div className={classes.value}>{children}</div>
      <button type="button" onClick={onIncrease} className={classes.button}>
        <IncreaseIcon />
      </button>
    </div>
  );
};

export default NudgeInput;
