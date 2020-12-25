import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import { Colors } from "components/ui/theme/colors";

function getBorder(theme: Theme) {
  if (theme.color.surface === Colors.White) {
    return `dashed 1px ${Colors.X2}`;
  }
  return "none";
}

const useStyles = makeStyles((theme: Theme) => ({
  ViewCap: {
    background: theme.color.surface,
    border: getBorder(theme),
    borderWidth: "0 0 1px 0",
    minHeight: 54,
  },
}));

interface ViewCapProps {}

const ViewCap: React.FC<ViewCapProps> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.ViewCap}>{children}</div>;
};

export default ViewCap;
