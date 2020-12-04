import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors, Theme } from "components/ui/theme/themes";

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

interface MainButtonProps extends React.ButtonHTMLAttributes<any> {}

const MainButton: React.FC<MainButtonProps> = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <button className={classes.MainButton} type="button" {...props}>
      {children}
    </button>
  );
};

export default MainButton;
