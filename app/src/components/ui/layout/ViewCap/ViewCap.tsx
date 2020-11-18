import React from "react";
import { makeStyles } from "@material-ui/styles";

type StyleProps = {
  bottom?: boolean;
  top?: boolean;
};

const useStyles = makeStyles({
  ViewCap: {
    background: "#e2e2e2",
    borderBottom: (props: StyleProps) =>
      props.top ? "solid 2px #CCCCCC" : "none",
    borderTop: (props: StyleProps) =>
      props.bottom ? "solid 2px #CCCCCC" : "none",
    minHeight: 54,
  },
});

interface ViewCapProps {
  bottom?: boolean;
  top?: boolean;
}

const ViewCap: React.FC<ViewCapProps> = ({ top, bottom, children }) => {
  const classes = useStyles({ top, bottom });

  return <div className={classes.ViewCap}>{children}</div>;
};

export default ViewCap;
