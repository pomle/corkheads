import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  NavigationBar: {
    alignItems: "center",
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    justifyContent: "space-between",
    padding: "8px 16px",
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
  back?: React.ReactNode;
  forward?: React.ReactNode;
  nav?: Nav;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  back,
  forward,
  nav,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.NavigationBar}>
      <div className="back">{nav?.back || back}</div>
      <div className="caption">{children}</div>
      <div className="forward">{nav?.forward || forward}</div>
    </div>
  );
};

export default NavigationBar;
