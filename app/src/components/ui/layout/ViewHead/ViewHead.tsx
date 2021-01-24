import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  ViewHead: {
    padding: "16px",
    "& h1": {
      color: theme.color.title,
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
