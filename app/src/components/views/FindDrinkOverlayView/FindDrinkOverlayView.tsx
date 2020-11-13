import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import * as paths from "components/route/paths";
import * as Trans from "./locales";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  findDrinkOverlayView: {
    height: "100%",
    position: "relative",
    width: "100%",
  },
  button: {
    alignItems: "center",
    background: "#F76640",
    borderRadius: "50%",
    bottom: "16px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
    color: "#fff",
    display: "flex",
    fontSize: "20px",
    fontWeight: 500,
    justifyContent: "center",
    height: "100px",
    pointerEvents: "all",
    position: "absolute",
    right: "16px",
    textAlign: "center",
    width: "100px",
  },
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
