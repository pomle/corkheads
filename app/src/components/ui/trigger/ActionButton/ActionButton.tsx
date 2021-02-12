import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import { Colors } from "components/ui/theme/colors";
import ButtonContent from "components/ui/layout";

type ButtonVariant = "primary" | "secondary";

const useStyles = makeStyles((theme: Theme) => {
  return {
    ActionButton: {
      background: (props: ActionButtonProps) => {
        if (props.variant === "primary") {
          return `linear-gradient(
            to right,
            ${Colors.ShinyGold},
            ${Colors.Gold}
          )`;
        }

        return Colors.X2;
      },
      borderRadius: "4px",
      color: (props: ActionButtonProps) => {
        if (props.variant === "primary") {
          return theme.color.surface;
        }

        return Colors.X1;
      },
      padding: "12px",
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
  variant?: ButtonVariant;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  variant = "primary",
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
