import React from "react";
import { makeStyles } from "@material-ui/styles";
import ThemeProvider from "components/ui/theme/ThemeProvider";

const useStyles = makeStyles({
  CollectionList: {
    display: "grid",
    gap: "16px",
    gridTemplateColumns: "repeat(auto-fit, minmax(154px, 1fr))",
    "& > *": {
      alignSelf: "start",
      justifySelf: "stretch",
    },
  },
});

interface CollectionListProps {}

const CollectionList: React.FC<CollectionListProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme="sky">
      <div className={classes.CollectionList}>{children}</div>
    </ThemeProvider>
  );
};

export default CollectionList;
