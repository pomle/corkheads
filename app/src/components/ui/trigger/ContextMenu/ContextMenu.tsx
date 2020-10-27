import React from "react";
import { makeStyles } from "@material-ui/styles";
import * as Text from "./locales";

const useStyles = makeStyles({
  contextMenu: {
    display: "grid",
    gridGap: 16,
    padding: 16,
    "& section": {
      background: "#fff",
      borderRadius: 8,
      display: "flex",
      flexDirection: "column",
      "& button": {
        borderTop: "1px solid #e0e0e0",
        fontSize: 18,
        textAlign: "center",
        padding: 16,
        "&:first-child": {
          border: "none"
        },
        "&.done": {
          color: "rgb(168, 67, 152)"
        }
      }
    }
  }
});

interface ContextMenuProps {
  onDone: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ children, onDone }) => {
  const classes = useStyles();

  return (
    <div className={classes.contextMenu}>
      <section>{children}</section>

      <section>
        <button type="button" className="done" onClick={onDone}>
          <Text.Done />
        </button>
      </section>
    </div>
  );
};

export default ContextMenu;
