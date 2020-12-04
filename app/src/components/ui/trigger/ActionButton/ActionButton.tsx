import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors, Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => {
  return {
    ActionButton: {
      background: theme.color.action,
      borderRadius: "4px",
      color: theme.color.surface,
      padding: "16px 24px 16px 24px",
      textAlign: "center",
      "&[disabled]": {
        background: Colors.BlueSmoke,
        color: Colors.White + "1",
      },
    },
  };
});

interface ActionButtonProps extends React.ButtonHTMLAttributes<any> {
  variant?: "action";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  variant,
  ...props
}) => {
  const classes = useStyles({ variant });

  return (
    <button className={classes.ActionButton} type="button" {...props}>
      {children}
    </button>
  );
};

export default ActionButton;
