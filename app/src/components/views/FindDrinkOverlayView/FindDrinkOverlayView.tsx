import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import * as paths from "components/route/paths";
import * as Trans from "./locales";
import { makeStyles } from "@material-ui/styles";
import { Colors, Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => {
  const color = Colors.Navy;

  return {
    findDrinkOverlayView: {
      height: "100%",
      pointerEvents: "none",
      position: "relative",
      width: "100%",
    },
    button: {
      alignItems: "center",
      background: `radial-gradient(
      circle closest-side,
      ${color} 0,
      ${color} 44px,
      transparent 45px,
      transparent 45.5px,
      ${color} 47px,
      ${color}
    )`,
      borderRadius: "50%",
      bottom: "16px",
      color: "#fff",
      display: "flex",
      fontSize: "16px",
      fontWeight: 500,
      justifyContent: "center",
      height: "96px",
      padding: "16px",
      pointerEvents: "all",
      position: "absolute",
      right: "16px",
      textAlign: "center",
      width: "96px",
    },
  };
});

const FindDrinkOverlayView: React.FC = () => {
  const history = useHistory();

  const goToExplore = useCallback(() => {
    const url = paths.exploreArticles.url({});
    history.push(url);
  }, [history]);

  const classes = useStyles();

  return (
    <div className={classes.findDrinkOverlayView}>
      <button onClick={goToExplore} className={classes.button}>
        <Trans.FindDrink />
      </button>
    </div>
  );
};

export default FindDrinkOverlayView;
