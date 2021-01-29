import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  TextItem: {
    fontSize: "14px",
    padding: "24px 8px",
    textAlign: "center",
    "& button": {
      color: theme.color.action,
      display: "inline",
      fontSize: "inherit",
    },
  },
}));

interface TextItemProps {}

const TextItem: React.FC<TextItemProps> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.TextItem}>{children}</div>;
};

export default TextItem;
