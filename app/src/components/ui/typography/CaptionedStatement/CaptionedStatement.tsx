import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {},
  caption: {
    fontSize: 16,
  },
  statement: {},
});

interface CaptionedStatementProps {
  caption: React.ReactNode;
}

const CaptionedStatement: React.FC<CaptionedStatementProps> = ({
  caption,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.caption}>{caption}</div>
      <h1>{children}</h1>
    </div>
  );
};

export default CaptionedStatement;
