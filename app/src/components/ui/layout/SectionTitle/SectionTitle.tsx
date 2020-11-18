import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  SectionTitle: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    "& > .main": {
      color: "#303030",
      fontSize: "20px",
      fontWeight: 700,
    },
    "& > .context": {},
  },
});

interface SectionProps {
  main: React.ReactNode;
  context?: React.ReactNode;
}

const SectionTitle: React.FC<SectionProps> = ({ main, context }) => {
  const classes = useStyles();
  return (
    <div className={classes.SectionTitle}>
      <div className="main">{main}</div>
      {context && <div className="context">{context}</div>}
    </div>
  );
};

export default SectionTitle;
