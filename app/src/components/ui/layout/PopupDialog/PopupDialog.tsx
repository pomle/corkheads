import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles({
  PopupDialog: {
    background: "#fff",
    borderRadius: "8px",
  },
});

const PopupDialog: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.PopupDialog}>{children}</div>;
};

export default PopupDialog;
