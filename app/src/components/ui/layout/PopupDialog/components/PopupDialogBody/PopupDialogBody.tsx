import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles({
  PopupDialogBody: {
    overflowX: "hidden",
    overflowY: "auto",
    margin: "24px",
  },
});

interface PopupDialogBodyProps {}

const PopupDialogBody: React.FC<PopupDialogBodyProps> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.PopupDialogBody}>{children}</div>;
};

export default PopupDialogBody;
