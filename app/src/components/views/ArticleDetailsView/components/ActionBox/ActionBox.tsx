import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import ActionButton from "components/ui/trigger/ActionButton";
import * as paths from "components/route/paths";
import { makeStyles } from "@material-ui/styles";
import { Colors, Theme } from "components/ui/theme/themes";
import Themer from "components/ui/theme/Themer";
import CollectionToggleButton from "./components/CollectionToggleButton";
import WishlistToggleButton from "./components/WishlistToggleButton";
import Ratings from "./components/Ratings";

const useStyles = makeStyles((theme: Theme) => ({
  ActionBox: {
    background: theme.color.surface,
    borderRadius: "5px",
    boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
    color: "#838383",
    display: "flex",
    flexFlow: "column",
    fontSize: "12px",
    fontWeight: 500,
    justifyContent: "stretch",
  },
  control: {
    display: "grid",
    gridGap: "8px",
    gridTemplateColumns: "1fr 1fr",
    "& > *:first-child": {
      gridColumn: "1 / 3",
    },
    padding: "16px",
  },
  ratings: {
    borderTop: `dashed 1px ${Colors.Milk}`,
    fontSize: "12px",
    padding: "16px",
  },
}));

interface ActionBoxProps {
  userId: string;
  articleId: string;
}

const ActionBox: React.FC<ActionBoxProps> = ({ userId, articleId }) => {
  const history = useHistory();
  const goToCheckIn = useCallback(() => {
    const url = paths.articleCheckIn.url({ articleId });
    history.push(url);
  }, [articleId, history]);

  const classes = useStyles();

  return (
    <div className={classes.ActionBox}>
      <div className={classes.control}>
        <ActionButton onClick={goToCheckIn}>Check in</ActionButton>
        <Themer theme="sky">
          <CollectionToggleButton userId={userId} articleId={articleId} />
          <WishlistToggleButton userId={userId} articleId={articleId} />
        </Themer>
      </div>

      <div className={classes.ratings}>
        <Themer theme="cream">
          <Ratings userId={userId} articleId={articleId} />
        </Themer>
      </div>
    </div>
  );
};

export default ActionBox;
