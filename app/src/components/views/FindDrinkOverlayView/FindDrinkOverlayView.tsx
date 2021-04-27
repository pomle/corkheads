import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors } from "components/ui/theme/colors";
import { ReactComponent as SearchIcon } from "assets/graphics/icons/magnifier.svg";
import { useScreen, createPath } from "components/context/ScreenContext";
import SearchView from "../SearchView";
import { SlideDown } from "components/ui/transitions/Slide";

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

const searchPath = createPath("/search");

interface FindDrinkOverlayViewProps {
  userId: string;
}

const FindDrinkOverlayView: React.FC<FindDrinkOverlayViewProps> = ({
  userId,
}) => {
  const goToSearch = useScreen({
    path: searchPath,
    render: () => <SearchView userId={userId} />,
    transition: SlideDown,
  });

  const classes = useStyles();

  return (
    <div className={classes.FindDrinkOverlayView}>
      <button onClick={() => goToSearch({})} className={classes.button}>
        <SearchIcon />
      </button>
    </div>
  );
};

export default FindDrinkOverlayView;
