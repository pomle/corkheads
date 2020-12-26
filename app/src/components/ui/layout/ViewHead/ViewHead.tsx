import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";

function color(theme: Theme) {
  return theme.color.title;
}

const useStyles = makeStyles((theme: Theme) => ({
  ViewHead: {
    padding: "8px 16px",
    "& h1": {
      color: color(theme),
      fontSize: "20px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
}));

const ViewHead: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.ViewHead}>{children}</div>;
};

export default ViewHead;
