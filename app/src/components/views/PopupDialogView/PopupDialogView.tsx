import React, { useRef } from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import { usePopupDialog } from "components/context/PopupDialogContext";

type StyleProps = {
  active: boolean;
};

const opacity = ({ active }: StyleProps) => {
  return active ? 1 : 0;
};

const useStyles = makeStyles({
  PopupDialogView: {
    height: "100%",
    overflow: "hidden",
    position: "relative",
    "& > *": {
      height: "100%",
      width: "100%",
      position: "absolute",
      top: 0,
      zIndex: 0,
    },
  },
  overlay: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    opacity,
    height: "100%",
    pointerEvents: (props) => (props.active ? "all" : "none"),
    position: "absolute",
    transition: "opacity 0.15s ease",
  },
  context: {
    filter: (props) => (props.active ? "brightness(0.5) blur(4px)" : "none"),
    height: "100%",
    position: "absolute",
    transition: "filter 0.3s ease",
  },
  content: {
    maxHeight: "calc(100% - 128px)",
    margin: "auto",
    transform: (props) =>
      props.active ? "none" : "scale(0.8) translate(0, 100%)",
    transition: "transform 0.3s ease",
    width: "calc(100% - 48px)",
  },
});

const PopupDialogView: React.FC = ({ children }) => {
  const { content } = usePopupDialog();

  const contentMemo = useRef<React.ReactNode>(content);

  if (content) {
    contentMemo.current = content;
  }

  const classes = useStyles({ active: !!content });

  return (
    <div className={classes.PopupDialogView}>
      <div className={classes.context}>{children}</div>
      <div className={classes.overlay}>
        <ThemeProvider theme="pure">
          <div className={classes.content}>{contentMemo.current}</div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default PopupDialogView;
