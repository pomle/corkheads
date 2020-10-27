import React, { useRef } from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import { useContextMenu } from "components/context/ContextMenuContext";

type StyleProps = {
  active: boolean;
};

const opacity = ({ active }: StyleProps) => {
  return active ? 1 : 0;
};

const useStyles = makeStyles({
  contextMenuView: {
    background: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    opacity,
    height: "100%",
    pointerEvents: props => (props.active ? "all" : "none"),
    transition: "opacity 0.3s ease"
  },
  content: {
    transform: props =>
      props.active ? "translate(0, 0)" : "translate(0, 100%)",
    transition: "transform 0.3s ease"
  }
});

const ContextMenuView: React.FC = () => {
  const { content } = useContextMenu();

  const contentMemo = useRef<React.ReactNode>(content);

  if (content) {
    contentMemo.current = content;
  }

  const classes = useStyles({ active: !!content });

  return (
    <div className={classes.contextMenuView}>
      <div className={classes.content}>{contentMemo.current}</div>
    </div>
  );
};

export default ContextMenuView;
