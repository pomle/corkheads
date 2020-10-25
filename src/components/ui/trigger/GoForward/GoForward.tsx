import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as ArrowForward } from "assets/graphics/icons/arrow-follow-forward.svg";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "flex",
    flexFlow: "row"
  },
  arrow: {
    marginLeft: 7
  }
});

interface GoForwardProps {
  icon: React.ReactNode;
}

const GoForward: React.FC<GoForwardProps> = ({ icon }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>{icon}</div>
      <div className={classes.arrow}>
        <ArrowForward />
      </div>
    </div>
  );
};

export default GoForward;
