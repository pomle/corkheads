import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors, Theme } from "components/ui/theme/themes";
import ButtonContent from "components/ui/layout";

const useStyles = makeStyles((theme: Theme) => {
  return {
    ActionButton: {
      background: `linear-gradient(
        to right,
        ${Colors.ShinyGold},
        ${Colors.Gold}
      )`,
      borderRadius: "4px",
      color: Colors.White,
      padding: "16px 24px 16px 24px",
      position: "relative",
      textAlign: "center",
      transition: "color 0.3s",
      "&[disabled]": {
        background: "#283041",
        color: "#1b2230",
      },
    },
  };
});

interface ActionButtonProps extends React.ButtonHTMLAttributes<any> {
  busy?: boolean;
  variant?: "action";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  variant,
  busy = false,
  ...props
}) => {
  const classes = useStyles({ variant });

  return (
    <button className={classes.ActionButton} type="button" {...props}>
      <ButtonContent busy={busy}>{children}</ButtonContent>
    </button>
  );
};

export default ActionButton;
