import React from "react";
import { makeStyles } from "@material-ui/styles";
import ActionButton from "components/ui/trigger/ActionButton";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";

const useStyles = makeStyles(() => ({
  offlineWindow: {
    background: "#ffffff",
    textAlign: "center",
    padding: "64px 0",
    margin: "auto",
    height: "100%",
    "& h2": {
      margin: "32px",
      fontSize: 36,
      lineHeight: "42px",
      fontWeight: "normal",
      marginBottom: "32px",
    },
    "& p": {
      margin: "32px",
      marginBottom: "64px",
    },
  },
}));
const OfflineView = () => {
  const classes = useStyles();
  return (
    <FullScreenLayout>
      <div className={classes.offlineWindow}>
        <h2>Offline</h2>
        <p>Please check your connection</p>

        <ActionButton>Try again</ActionButton>
      </div>
    </FullScreenLayout>
  );
};

export default OfflineView;
