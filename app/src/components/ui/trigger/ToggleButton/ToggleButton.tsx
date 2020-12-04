import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import { ReactComponent as CheckIcon } from "assets/graphics/icons/check.svg";
import { ReactComponent as PlusIcon } from "assets/graphics/icons/plus.svg";

const useStyles = makeStyles((theme: Theme) => ({
  ToggleButton: {
    alignItems: "center",
    background: (props: ToggleButtonProps) => {
      if (props.toggled) {
        return theme.color.surface;
      }
      return "none";
    },
    border: "solid 1px",
    borderColor: theme.color.surface,
    borderRadius: "3px",
    color: (props: ToggleButtonProps) => {
      if (props.toggled) {
        return theme.color.text;
      }
      return theme.color.action;
    },
    display: "flex",
    fontSize: "12px",
    fontWeight: 700,
    justifyContent: "center",
    padding: "12px",
    textAlign: "center",
    "&[disabled]": {
      opacity: 0.3,
    },
    "& svg": {
      height: "1em",
      marginRight: "0.4em",
      width: "1em",
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
