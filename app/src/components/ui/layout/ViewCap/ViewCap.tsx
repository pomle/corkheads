import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    background: "#e2e2e2",
    borderColor: "#CCCCCC",
    borderStyle: "solid",
    borderWidth: 0,
    minHeight: 54,
  },
  bottomBorder: {
    borderBottomWidth: "1px",
  },
  topBorder: {
    borderTopWidth: "1px",
  },
});

interface ViewCapProps {
  bottom?: boolean;
  top?: boolean;
}

const ViewCap: React.FC<ViewCapProps> = ({ top, bottom, children }) => {
  const classes = useStyles();

  const classNames = [classes.root];
  if (top) {
    classNames.push(classes.bottomBorder);
  }
  if (bottom) {
    classNames.push(classes.topBorder);
  }

  return <div className={classNames.join(" ")}>{children}</div>;
};

export default ViewCap;
