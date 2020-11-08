import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as ContextMenuIcon } from "assets/graphics/context-menu.svg";

const useStyles = makeStyles({
  contextMenuButton: {
    alignItems: "center",
    borderRadius: 24,
    color: "#000",
    display: "flex",
    justifyContent: "center",
    height: 24,
    width: 24,
    "&[disabled]": {
      opacity: 0.3,
    },
  },
});

type ContextMenuButtonProps = React.ButtonHTMLAttributes<any>;

const ContextMenuButton: React.FC<ContextMenuButtonProps> = ({ ...props }) => {
  const classes = useStyles();

  return (
    <button type="button" className={classes.contextMenuButton} {...props}>
      <ContextMenuIcon />
    </button>
  );
};

export default ContextMenuButton;
