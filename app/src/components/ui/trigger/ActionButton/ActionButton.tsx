import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors, Theme } from "components/ui/theme/themes";
import ButtonContent from "components/ui/layout";

const useStyles = makeStyles((theme: Theme) => {
  return {
    ActionButton: {
      background: theme.color.action,
      borderRadius: "4px",
      color: theme.color.surface,
      padding: "16px 24px 16px 24px",
      position: "relative",
      textAlign: "center",
      "&[disabled]": {
        background: Colors.BlueSmoke,
        color: Colors.White + "1",
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
