import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  Badge: {
    background: "#ff6a41",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "9px",
    lineHeight: 1,
    padding: "3px 16px",
    textAlign: "center",
    textTransform: "uppercase",
    width: "max-content",
  },
});

interface BadgeProps {}

const Badge: React.FC<BadgeProps> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.Badge}>{children}</div>;
};

export default Badge;
