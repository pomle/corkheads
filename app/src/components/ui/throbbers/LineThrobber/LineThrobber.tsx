import React from "react";
import { makeStyles } from "@material-ui/styles";

type StyleProps = {
  color: string;
};

const useStyles = makeStyles({
  "@keyframes travel": {
    "0%": { left: "-50%", right: "100%" },
    "50%": { left: "20%", right: "20%" },
    "100%": { left: "100%", right: "-50%" },
  },
  track: {
    height: 4,
    position: "relative",
    overflow: "hidden",
    width: "100%",
  },
  indicator: {
    animation: "$travel 1s linear infinite",
    background: (props: StyleProps) => props.color,
    height: "100%",
    position: "absolute",
  },
});

interface LineThrobberProps {
  color?: string;
}

const LineThrobber: React.FC<LineThrobberProps> = ({ color = "#2A2A2A" }) => {
  const classes = useStyles({ color });

  return (
    <div className={classes.track}>
      <div className={classes.indicator} />
    </div>
  );
};

export default LineThrobber;
