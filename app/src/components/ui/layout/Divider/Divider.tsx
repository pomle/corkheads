import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors, Theme } from "components/ui/theme/themes";

function getDividerColor(theme: Theme) {
  if (theme.color.surface === Colors.White) {
    return Colors.Cream;
  } else if (theme.color.surface === Colors.Navy) {
    return Colors.BlueSmoke;
  } else if (theme.color.surface === Colors.BlueSmoke) {
    return Colors.MarbleBlue;
  }
  return "#ffffff";
}

const useStyles = makeStyles((theme: Theme) => {
  const dividerColor = getDividerColor(theme);

  return {
    Divider: {
      background: `linear-gradient(
          to right,
          ${dividerColor}00,
          ${dividerColor}f0,
          ${dividerColor}00
        )`,
      height: "1px",
    },
  };
});

const Divider: React.FC = () => {
  const classes = useStyles();
  return <div className={classes.Divider} />;
};

export default Divider;
