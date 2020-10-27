import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    lineHeight: "22px"
  },
  primary: {
    fontWeight: 500
  },
  secondary: {
    color: "#888",
    fontSize: 12,
    fontWeight: 400
  }
});

interface CaptionedPairProps {
  primary: React.ReactNode;
  secondary: React.ReactNode;
}

const CaptionedPair: React.FC<CaptionedPairProps> = ({
  primary,
  secondary
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.primary}>{primary}</div>
      <div className={classes.secondary}>{secondary}</div>
    </div>
  );
};

export default CaptionedPair;
