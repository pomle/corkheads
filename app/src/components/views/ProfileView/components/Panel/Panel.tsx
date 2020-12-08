import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  Panel: {
    background: theme.color.surface,
    borderRadius: "16px 0 0 16px",
    overflow: "hidden",
    padding: "8px",
  },
}));

const Panel: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.Panel}>{children}</div>;
};

export default Panel;
