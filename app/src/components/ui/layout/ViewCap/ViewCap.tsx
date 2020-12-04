import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  ViewCap: {
    background: theme.color.surface,
    minHeight: 54,
  },
}));

interface ViewCapProps {}

const ViewCap: React.FC<ViewCapProps> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.ViewCap}>{children}</div>;
};

export default ViewCap;
