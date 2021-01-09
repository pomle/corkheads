import React from "react";
import { makeStyles } from "@material-ui/styles";

import { useCheckInReaction } from "components/hooks/db/useCheckInReaction";
import StateButton from "components/ui/trigger/StateButton";
import ThemeProvider from "components/ui/theme/ThemeProvider";

const useStyles = makeStyles({
  Reactions: {},
});

interface ReactionsProps {
  checkInId: string;
  userId: string;
}

const Reactions: React.FC<ReactionsProps> = ({ checkInId, userId }) => {
  const { reaction, putReaction, dropReaction } = useCheckInReaction(
    checkInId,
    userId
  );

  const classes = useStyles();

  return (
    <ThemeProvider theme="dusk">
      <div className={classes.Reactions}>
        {reaction ? (
          <StateButton state="on" onClick={() => dropReaction()}>
            Unlike
          </StateButton>
        ) : (
          <StateButton
            state="off"
            onClick={() => putReaction({ tags: ["like"] })}
          >
            Like
          </StateButton>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Reactions;
