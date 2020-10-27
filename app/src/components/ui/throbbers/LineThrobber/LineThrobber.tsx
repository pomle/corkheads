import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  "@keyframes travel": {
    "0%": { left: "-50%", right: "100%" },
    "50%": { left: "20%", right: "20%" },
    "100%": { left: "100%", right: "-50%" }
  },
  track: {
    height: 4,
    position: "relative",
    overflow: "hidden",
    width: "100%"
  },
  indicator: {
    animation: "$travel 1s linear infinite",
    background: "#2A2A2A",
    height: "100%",
    position: "absolute"
  }
});

const LineThrobber: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.track}>
      <div className={classes.indicator} />
    </div>
  );
};

export default LineThrobber;
