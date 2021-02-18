import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  PopupDialog: {
    background: theme.color.surface,
    borderRadius: "8px",
    boxShadow: "0 8px 24px -4px #0006",
    color: theme.color.text,
  },
}));

const PopupDialog: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.PopupDialog}>{children}</div>;
};

export default PopupDialog;
