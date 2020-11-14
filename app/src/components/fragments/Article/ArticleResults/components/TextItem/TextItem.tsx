import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  TextItem: {
    background: "#fff",
    fontSize: "14px",
    padding: "32px",
    textAlign: "center",
  },
});

interface TextItemProps {}

const TextItem: React.FC<TextItemProps> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.TextItem}>{children}</div>;
};

export default TextItem;
