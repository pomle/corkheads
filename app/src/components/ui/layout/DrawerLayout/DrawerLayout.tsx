import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import Slide, { SlideDirection } from "components/ui/transitions/Slide";

const MEASUREMENT_UPDATE_INTERVAL_MS = 1000;

interface StyleProps {
  dialogSize: number;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexFlow: "column",
    height: "100%",
    overflow: "hidden",
    position: "relative",
  },
  content: (props: StyleProps) => ({
    flex: "auto",
    height: "100%",
    overflow: "scroll",
    paddingBottom: props.dialogSize,
  }),
  dialog: {
    "& > div": {
      bottom: 0,
      height: "auto",
      position: "absolute",
      width: "100%",
    },
  },
});

interface DrawerLayoutProps {
  active: boolean;
  /* Pad content to help ensure user can scroll to see all content. */
  pad?: boolean;
  children: [React.ReactNode, React.ReactNode];
}

const DrawerLayout: React.FC<DrawerLayoutProps> = ({
  active,
  pad = false,
  children: [content, dialog],
}) => {
  const [dialogSize, setDialogSize] = useState<number>(0);
  const classes = useStyles({ dialogSize });

  const dialogElement = useRef<HTMLDivElement>(null);

  const updateSize = useCallback(() => {
    if (dialogElement.current) {
      const content = dialogElement.current.children[0];
      const rect = content.getBoundingClientRect();
      setDialogSize(rect.height);
    }
  }, []);

  useLayoutEffect(() => {
    if (pad) {
      updateSize();
      const timer = setInterval(updateSize, MEASUREMENT_UPDATE_INTERVAL_MS);
      return () => clearInterval(timer);
    } else {
      setDialogSize(0);
    }
  }, [updateSize, pad]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>{content}</div>
      <div className={classes.dialog} ref={dialogElement}>
        <Slide direction={SlideDirection.Down} active={active}>
          {dialog}
        </Slide>
      </div>
    </div>
  );
};

export default DrawerLayout;
