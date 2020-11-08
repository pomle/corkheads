import React, { useState, useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import ViewStack from "components/ui/layout/ViewStack";
import Slide, { SlideDirection } from "components/ui/transitions/Slide";
import ErrorLogView from "components/views/ErrorLogView";
import NavigationBar from "components/ui/layout/NavigationBar";
import ActionButton from "components/ui/trigger/ActionButton";
import { useErrorHandler } from "components/context/ErrorContext";
import { useAutoClearState } from "components/hooks/useAutoClearState";
import ErrorEntryMessage from "components/fragments/Error/ErrorEntry";

const useStyles = makeStyles({
  toast: {
    bottom: 0,
    height: "auto",
    top: "auto",
  },
  controls: {
    background: "#fff",
    display: "grid",
    gridGap: 20,
    padding: 20,
    pointerEvents: "all",
  },
});

const ErrorOverlay: React.FC = () => {
  const classes = useStyles();

  const [showToast, setShowToast] = useAutoClearState<boolean>(5000, false);

  const [isLogVisible, setIsLogVisible] = useState<boolean>(false);
  const showLog = useCallback(() => setIsLogVisible(true), [setIsLogVisible]);
  const hideLog = useCallback(() => setIsLogVisible(false), [setIsLogVisible]);

  const { entries } = useErrorHandler();

  const lastEntry = entries[0];

  useEffect(() => {
    if (lastEntry) {
      setShowToast(true);
    }
  }, [lastEntry, setShowToast]);

  const hide = (
    <button type="button" onClick={hideLog}>
      Hide
    </button>
  );

  const nav = <NavigationBar forward={hide} />;

  return (
    <ViewStack>
      <div className={classes.toast}>
        <Slide direction={SlideDirection.Down} active={showToast}>
          <div className={classes.controls}>
            {lastEntry ? <ErrorEntryMessage errorEntry={lastEntry} /> : null}

            <ActionButton variant="danger" onClick={showLog}>
              Show Errors
            </ActionButton>
          </div>
        </Slide>
      </div>
      <Slide direction={SlideDirection.Down} active={isLogVisible}>
        <ErrorLogView nav={nav} />
      </Slide>
    </ViewStack>
  );
};

export default ErrorOverlay;
