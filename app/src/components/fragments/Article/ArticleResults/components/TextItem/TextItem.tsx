import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  TextItem: {
    fontSize: "12px",
    padding: "24px 8px",
    textAlign: "center",
  },
});

interface TextItemProps {}

const TextItem: React.FC<TextItemProps> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.TextItem}>{children}</div>;
};

export default TextItem;
