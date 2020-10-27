import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as ArrowIcon } from "assets/graphics/icons/arrow-editable-item.svg";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "flex"
  },
  content: {
    flex: "1"
  },
  icon: {
    display: "flex",
    flex: "0 1 24px",
    justifyContent: "flex-end"
  }
});

const GoInto: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
      <div className={classes.icon}>
        <ArrowIcon />
      </div>
    </div>
  );
};

export default GoInto;
