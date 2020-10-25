import React from "react";
import { makeStyles } from "@material-ui/styles";

type LabeledBadgeType = "danger" | "alert" | "safe";

const calculateBackgroundColor = ({ variant }: LabeledBadgeProps) => {
  if (variant === "danger") {
    return "#FC5C63";
  } else if (variant === "alert") {
    return "#FECC00";
  }
  return "#5ADC9B";
};

const calculateFontColor = ({ variant }: LabeledBadgeProps) => {
  if (variant === "alert") {
    return "#2A2A2A";
  }
  return "#fff";
};

const useStyles = makeStyles({
  root: {
    background: calculateBackgroundColor,
    height: "24px",
    borderRadius: "3px",
    lineHeight: "22px",
    fontSize: "16px",
    fontWeight: "normal",
    flexDirection: "row",
    display: "flex",
    textAlign: "center",
    color: calculateFontColor,
    paddingLeft: "9px",
    paddingRight: "9px"
  }
});

interface LabeledBadgeProps {
  variant: LabeledBadgeType;
}

const LabeledBadge: React.FC<LabeledBadgeProps> = ({ children, variant }) => {
  const classes = useStyles({ variant });
  return <div className={classes.root}>{children}</div>;
};

export default LabeledBadge;
