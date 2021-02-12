import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles({
  PopupDialogButtonSet: {
    borderRadius: "0 0 8px 8px",
    display: "flex",
    overflow: "hidden",
    width: "100%",
    "& > button": {
      borderRadius: 0,
      flex: "1",
    },
  },
});

const PopupDialogButtonSet: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.PopupDialogButtonSet}>{children}</div>;
};

export default PopupDialogButtonSet;
