import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  "@keyframes turn": {
    "0%": { transform: "rotate(0)" },
    "100%": { transform: "rotate(360deg)" },
  },
  CircleThrobber: {
    animation: "$turn 1s linear infinite",
    border: `4px solid ${theme.color.text}`,
    borderBottomColor: theme.color.panel,
    borderRadius: "50%",
    height: "72px",
    position: "relative",
    width: "72px",
  },
}));

const CircleThrobber: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.CircleThrobber} />;
};

export default CircleThrobber;
