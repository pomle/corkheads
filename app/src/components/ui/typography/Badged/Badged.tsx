import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  Badged: {
    alignItems: "center",
    display: "grid",
    gridAutoFlow: "column",
    gridGap: "8px",
  },
});

const Badged: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.Badged}>{children}</div>;
};

export default Badged;
