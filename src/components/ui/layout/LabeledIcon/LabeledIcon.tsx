import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "flex",
    flexFlow: "column",
    padding: 10
  },
  icon: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: 20,
    width: 20
  },
  label: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: 0.16,
    marginTop: 6
  }
});

interface LabeledIconProps {
  icon: React.ReactNode;
  label: React.ReactNode;
}

const LabeledIcon: React.FC<LabeledIconProps> = ({ icon, label }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.icon}>{icon}</div>
      <div className={classes.label}>{label}</div>
    </div>
  );
};

export default LabeledIcon;
