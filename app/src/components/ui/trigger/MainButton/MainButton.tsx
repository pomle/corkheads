import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors, Theme } from "components/ui/theme/themes";
import ButtonContent from "components/ui/layout";

const useStyles = makeStyles((theme: Theme) => {
  return {
    MainButton: {
      background: Colors.Gold,
      borderRadius: "4px",
      color: Colors.Navy,
      padding: "16px 24px 16px 24px",
      textAlign: "center",
      "&[disabled]": {
        background: Colors.Slate,
      },
    },
  };
});

interface MainButtonProps extends React.ButtonHTMLAttributes<any> {
  busy?: boolean;
}

const MainButton: React.FC<MainButtonProps> = ({
  children,
  busy = false,
  ...props
}) => {
  const classes = useStyles();

  return (
    <button className={classes.MainButton} type="button" {...props}>
      <ButtonContent busy={busy}> {children}</ButtonContent>
    </button>
  );
};

export default MainButton;
