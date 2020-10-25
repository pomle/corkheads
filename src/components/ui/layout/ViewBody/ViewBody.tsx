import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  useScrollHandle,
  ScrollContext
} from "components/context/ScrollContext";

const useStyles = makeStyles({
  ViewBody: {
    background: "#F8F8F8",
    height: "100%",
    overflow: "scroll",
    position: "relative" // Creates link to children's offsetParent
  }
});

const ViewBody: React.FC = ({ children }) => {
  const classes = useStyles();

  const [handleRef, contextValue] = useScrollHandle<HTMLDivElement>();

  return (
    <ScrollContext value={contextValue}>
      <div ref={handleRef} className={classes.ViewBody}>
        {children}
      </div>
    </ScrollContext>
  );
};

export default ViewBody;
