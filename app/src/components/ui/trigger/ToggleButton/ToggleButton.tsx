import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import { ReactComponent as CheckIcon } from "assets/graphics/icons/check.svg";
import { ReactComponent as PlusIcon } from "assets/graphics/icons/plus.svg";
import { Colors } from "components/ui/theme/colors";

const useStyles = makeStyles((theme: Theme) => ({
  ToggleButton: {
    alignItems: "center",
    background: (props: ToggleButtonProps) =>
      props.toggled ? theme.color.panel : theme.color.surface,
    border: "solid 2px",
    borderColor: (props: ToggleButtonProps) =>
      props.toggled ? "transparent" : theme.color.accent,
    borderRadius: "24px",
    color: (props: ToggleButtonProps) =>
      props.toggled ? Colors.Sot : Colors.MarbleBlue,
    display: "flex",
    fontSize: "12px",
    fontWeight: 700,
    justifyContent: "center",
    padding: "8px",
    textAlign: "center",
    "&[disabled]": {
      opacity: 0.3,
    },
    "& svg": {
      height: "0.8em",
      marginRight: "0.4em",
      width: "0.8em",
    },
  },
}));

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
      {toggled ? <CheckIcon /> : <PlusIcon />} {children}
    </button>
  );
};

export default ToggleButton;
