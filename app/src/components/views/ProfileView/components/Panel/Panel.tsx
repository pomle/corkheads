import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  Panel: {
    background: theme.color.surface,
    padding: "8px 0",
  },
}));

const Panel: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.Panel}>{children}</div>;
};

export default Panel;
