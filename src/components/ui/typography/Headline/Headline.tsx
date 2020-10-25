import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between"
  },
  secondary: {
    color: "#999999"
  }
});

interface HeadlineProps {
  primary: React.ReactNode;
  secondary: React.ReactNode;
}

const Headline: React.FC<HeadlineProps> = ({ primary, secondary }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3>{primary}</h3>
      <div className={classes.secondary}>{secondary}</div>
    </div>
  );
};

export default Headline;
