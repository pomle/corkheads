import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors } from "components/ui/theme/colors";
import { ReactComponent as SearchIcon } from "assets/graphics/icons/magnifier.svg";

const useStyles = makeStyles({
  FindDrinkOverlayView: {
    height: "100%",
    pointerEvents: "none",
    position: "relative",
    width: "100%",
  },
  button: {
    alignItems: "center",
    background: Colors.Navy,
    borderRadius: "50%",
    bottom: "16px",
    boxShadow: "0 8px 16px #00000050",
    color: "#fff",
    display: "flex",
    fontSize: "16px",
    fontWeight: 500,
    justifyContent: "center",
    height: "80px",
    padding: "16px",
    pointerEvents: "all",
    position: "absolute",
    right: "16px",
    textAlign: "center",
    width: "80px",
    "& svg": {
      width: "60%",
      "& path": {
        fill: "#fff",
      },
    },
  },
});

interface FindDrinkOverlayViewProps {
  routes: {
    search: () => void;
  };
}

const FindDrinkOverlayView: React.FC<FindDrinkOverlayViewProps> = ({
  routes,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.FindDrinkOverlayView}>
      <button onClick={routes.search} className={classes.button}>
        <SearchIcon />
      </button>
    </div>
  );
};

export default FindDrinkOverlayView;
