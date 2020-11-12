import React from "react";
import { makeStyles } from "@material-ui/styles";

type ButtonType = "action" | "safe" | "danger" | "detail";

const calculateBackgroundColor = ({ variant }: ActionButtonProps) => {
  if (variant === "danger") {
    return "#FC5C63";
  } else if (variant === "action") {
    return "#F76640";
  } else if (variant === "detail") {
    return "#f8f8f8";
  }
  return "#5ADC9B";
};

const calculateFontColor = ({ variant }: ActionButtonProps) => {
  if (variant === "detail") {
    return "#A84398";
  }
  return "#fff";
};

const useStyles = makeStyles({
  actionButton: {
    background: calculateBackgroundColor,
    borderRadius: "2px",
    color: calculateFontColor,
    fontSize: 16,
    fontWeight: 500,
    padding: "16px 24px 16px 24px",
    textAlign: "center",
    "&[disabled]": {
      background: "#EAEAEA",
      color: "#999999",
    },
  },
});

interface ActionButtonProps extends React.ButtonHTMLAttributes<any> {
  variant: ButtonType;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  variant,
  ...props
}) => {
  const classes = useStyles({ variant });

  return (
    <button type="button" className={classes.actionButton} {...props}>
      {children}
    </button>
  );
};

export default ActionButton;
