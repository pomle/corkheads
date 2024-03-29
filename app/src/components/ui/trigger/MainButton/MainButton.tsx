import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import { Colors } from "components/ui/theme/colors";
import ButtonContent from "components/ui/layout";

const useStyles = makeStyles((theme: Theme) => {
  return {
    MainButton: {
      background: `linear-gradient(
        to right,
        ${Colors.ShinyGold},
        ${Colors.Gold}
      )`,
      color: theme.color.surface,
      padding: "16px 24px 16px 24px",
      textAlign: "center",
      transition: "color 0.3s",
      "&[disabled]": {
        background: "#283041",
        color: "#1b2230",
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
