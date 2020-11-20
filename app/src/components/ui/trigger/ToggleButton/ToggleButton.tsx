import React from "react";
import { makeStyles } from "@material-ui/styles";

const calculateBackgroundColor = ({ toggled }: ToggleButtonProps) => {
  if (toggled) {
    return "#5acf99";
  }
  return "#fff";
};

const calculateBorderColor = ({ toggled }: ToggleButtonProps) => {
  if (toggled) {
    return "#5acf99";
  }
  return "#ff6a41";
};

const calculateFontColor = ({ toggled }: ToggleButtonProps) => {
  if (toggled) {
    return "#fff";
  }
  return "#ff6a41";
};

const useStyles = makeStyles({
  ToggleButton: {
    background: calculateBackgroundColor,
    border: "solid 2px",
    borderColor: calculateBorderColor,
    borderRadius: "3px",
    color: calculateFontColor,
    fontSize: "12px",
    fontWeight: 700,
    padding: "12px",
    textAlign: "center",
    "&[disabled]": {
      background: "#EAEAEA",
      color: "#999999",
    },
  },
});

interface ToggleButtonProps extends React.ButtonHTMLAttributes<any> {
  toggled?: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  children,
  toggled = false,
  ...props
}) => {
  const classes = useStyles({ toggled });

  return (
    <button type="button" className={classes.ToggleButton} {...props}>
      {children}
    </button>
  );
};

export default ToggleButton;
