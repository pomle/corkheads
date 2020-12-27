import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import { Colors } from "components/ui/theme/colors";

type State = "on" | "pending" | "off";

type StyleProps = {
  state: State;
};

function color(props: StyleProps) {
  if (props.state === "off") {
    return Colors.Gold;
  } else if (props.state === "on") {
    return Colors.Sot;
  }
  return Colors.MarbleBlue;
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    StateButton: {
      alignItems: "center",
      background: theme.color.panel,
      borderRadius: "32px",
      color,
      display: "flex",
      fontSize: "14px",
      fontWeight: 400,
      padding: "8px 16px",
      textAlign: "center",
      transition: "color 0.3s",
      "&[disabled]": {
        background: "#283041",
        color: "#1b2230",
      },
      "& svg": {
        height: "0.8em",
        marginRight: "0.4em",
        width: "0.8em",
        "& path": {
          stroke: color,
        },
      },
    },
  };
});

interface StateButtonProps extends React.ButtonHTMLAttributes<any> {
  state: State;
}

const StateButton: React.FC<StateButtonProps> = ({
  children,
  state,
  ...props
}) => {
  const classes = useStyles({ state });

  return (
    <button className={classes.StateButton} type="button" {...props}>
      {children}
    </button>
  );
};

export default StateButton;
