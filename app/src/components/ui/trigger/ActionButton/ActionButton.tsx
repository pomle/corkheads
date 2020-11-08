import React from "react";
import { makeStyles } from "@material-ui/styles";

type ButtonType = "safe" | "danger" | "detail";

const calculateBackgroundColor = ({ variant }: ActionButtonProps) => {
  if (variant === "danger") {
    return "#FC5C63";
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
    borderRadius: 24,
    color: calculateFontColor,
    fontSize: 14,
    minWidth: 145,
    padding: "8px 20px 9px 20px",
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
