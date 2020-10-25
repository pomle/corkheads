import React from "react";
import { ReactComponent as CheckMarkWithCircle } from "assets/graphics/icons/checkmarkwithcircle.svg";
import { makeStyles } from "@material-ui/styles";

type CheckCircleType = "safe" | "detail" | "disabled";

const useStyles = makeStyles(() => ({
  backgroundColor: {
    fill: calculateBackgroundColor,
    stroke: calculateCheckMarkColor,
    "& path": {
      fill: calculateCheckMarkColor,
      stroke: "none"
    }
  }
}));

const calculateBackgroundColor = ({ variant }: CheckMarkWithCircleProps) => {
  if (variant === "safe") {
    return "#5ADC9B";
  } else if (variant === "detail") {
    return "#CCC";
  } else {
    return "#fff";
  }
};

const calculateCheckMarkColor = ({ variant }: CheckMarkWithCircleProps) => {
  if (variant === "safe") {
    return "#fff";
  } else if (variant === "detail") {
    return "#fff";
  } else {
    return "#EAEAEA";
  }
};
interface CheckMarkWithCircleProps {
  variant: CheckCircleType;
}
const CheckCircleIcon: React.FC<CheckMarkWithCircleProps> = ({ variant }) => {
  const classes = useStyles({ variant });

  return <CheckMarkWithCircle className={classes.backgroundColor} />;
};

export default CheckCircleIcon;
