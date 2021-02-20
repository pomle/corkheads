import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  NavigationBar: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    minHeight: "24px",
    padding: "16px 16px 0 16px",
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
}

const NavigationBar: React.FC<NavigationBarProps> = ({ back, forward }) => {
  const classes = useStyles();

  return (
    <div className={classes.NavigationBar}>
      <div className="back">{back}</div>
      <div className="forward">{forward}</div>
    </div>
  );
};

export default NavigationBar;
