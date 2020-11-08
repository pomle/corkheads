import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "flex",
    fontSize: 17,
    justifyContent: "space-between",
    minHeight: 24,
    padding: "16px 16px 6px 16px",
    "& button": {
      margin: "-12px -12px",
      padding: "12px 12px",
    },
  },
});

interface NavigationBarProps {
  back?: React.ReactNode;
  forward?: React.ReactNode;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ back, forward }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>{back}</div>
      <div>{forward}</div>
    </div>
  );
};

export default NavigationBar;
