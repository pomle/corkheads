import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexFlow: "column",
    height: "100%",
    pointerEvents: "all",
  },
  header: {
    flex: "0 1",
  },
  content: {
    flex: "auto",
    height: "100%",
    overflow: "hidden",
  },
});

interface HeaderLayoutProps {
  children: [React.ReactNode, React.ReactNode];
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  children: [header, content],
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>{header}</div>
      <div className={classes.content}>{content}</div>
    </div>
  );
};

export default HeaderLayout;
