import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  ViewHead: {
    padding: "16px 16px",
  },
});

const ViewHead: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.ViewHead}>{children}</div>;
};

export default ViewHead;
