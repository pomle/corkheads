import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexFlow: "column",
    height: "100%",
    pointerEvents: "all"
  },
  content: {
    flex: "auto",
    height: "100%",
    overflow: "hidden"
  },
  tabs: {
    flex: "0 1"
  }
});

interface TabLayoutProps {
  children: [React.ReactNode, React.ReactNode];
}

const TabLayout: React.FC<TabLayoutProps> = ({ children: [content, tabs] }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>{content}</div>
      <div className={classes.tabs}>{tabs}</div>
    </div>
  );
};

export default TabLayout;
