import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  useScrollHandle,
  ScrollContext,
} from "components/context/ScrollContext";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  Scroll: {
    height: "100%",
    overflow: "auto",
    position: "relative", // Creates link to children's offsetParent
  },
}));

const Scroll: React.FC = ({ children }) => {
  const classes = useStyles();

  const [handleRef, contextValue] = useScrollHandle<HTMLDivElement>();

  return (
    <ScrollContext value={contextValue}>
      <div ref={handleRef} className={classes.Scroll}>
        {children}
      </div>
    </ScrollContext>
  );
};

export default Scroll;
