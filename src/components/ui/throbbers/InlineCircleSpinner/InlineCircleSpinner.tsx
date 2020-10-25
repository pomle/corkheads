import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as Icon } from "assets/graphics/icons/3-4-circle.svg";

const useStyles = makeStyles({
  icon: {
    display: "inline-block",
    height: 20,
    padding: "0 5px",
    width: 20
  }
});

const InlineCircleSpinner: React.FC = () => {
  const classes = useStyles();

  return (
    <span className={classes.icon}>
      <Icon height={20} width={20} />
    </span>
  );
};

export default InlineCircleSpinner;
