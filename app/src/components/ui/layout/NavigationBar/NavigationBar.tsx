import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  NavigationBar: {
    alignItems: "center",
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    justifyContent: "space-between",
    padding: "12px 16px",
    "& > .back": {
      justifySelf: "start",
    },
    "& > .forward": {
      justifySelf: "end",
    },
    "& button": {
      margin: "-12px",
      padding: "12px",
    },
  },
});

export type Nav = {
  back?: React.ReactNode;
  forward?: React.ReactNode;
};

interface NavigationBarProps {
  nav?: Nav;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ nav, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.NavigationBar}>
      <div className="back">{nav?.back}</div>
      <div className="caption">{children}</div>
      <div className="forward">{nav?.forward}</div>
    </div>
  );
};

export default NavigationBar;
