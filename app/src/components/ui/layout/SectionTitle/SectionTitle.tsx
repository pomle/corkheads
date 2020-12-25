import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors, Theme } from "components/ui/theme/themes";

function getMainColor(theme: Theme) {
  return theme.color.title;
}

function getContextColor(theme: Theme) {
  if (theme.color.surface === Colors.White) {
    return Colors.Sot;
  }
  return "#8f96a2";
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    SectionTitle: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      "& > .main": {
        color: getMainColor(theme),
        fontSize: "18px",
      },
      "& > .context, & a": {
        color: getContextColor(theme),
        fontSize: "14px",
      },
    },
  };
});

interface SectionProps {
  main: React.ReactNode;
  context?: React.ReactNode;
}

const SectionTitle: React.FC<SectionProps> = ({ main, context }) => {
  const classes = useStyles();
  return (
    <div className={classes.SectionTitle}>
      <h3 className="main">{main}</h3>
      {context && <div className="context">{context}</div>}
    </div>
  );
};

export default SectionTitle;
