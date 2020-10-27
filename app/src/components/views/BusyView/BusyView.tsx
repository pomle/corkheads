import React from "react";
import { makeStyles } from "@material-ui/styles";
import LineThrobber from "components/ui/throbbers/LineThrobber";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    background: "#fff",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center"
  },
  throbber: {
    margin: 20,
    width: "80%"
  },
  message: {
    margin: 20
  }
});

const BusyView: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <FullScreenLayout>
      <div className={classes.root}>
        <div className={classes.throbber}>
          <LineThrobber />
        </div>

        <div className={classes.message}>{children}</div>
      </div>
    </FullScreenLayout>
  );
};

export default BusyView;
