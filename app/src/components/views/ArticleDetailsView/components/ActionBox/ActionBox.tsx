import React from "react";
import ActionButton from "components/ui/trigger/ActionButton";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import CollectionToggleButton from "./components/CollectionToggleButton";
import WishlistToggleButton from "./components/WishlistToggleButton";
import Ratings from "./components/Ratings";

const useStyles = makeStyles((theme: Theme) => ({
  ActionBox: {
    background: theme.color.surface,
    borderColor: theme.color.panel,
    borderRadius: "4px",
    boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexFlow: "column",
    fontSize: "12px",
    justifyContent: "stretch",
  },
  control: {
    display: "grid",
    gridGap: "8px",
    gridTemplateColumns: "1fr",
    padding: "16px",
    "@media (min-width: 360px)": {
      gridTemplateColumns: "1fr 1fr",
      "& > *:first-child": {
        gridColumn: "1 / 3",
      },
    },
  },
}));

interface ActionBoxProps {
  routes: {
    createCheckIn: () => void;
  };
  userId: string;
  articleId: string;
}

const ActionBox: React.FC<ActionBoxProps> = ({ routes, userId, articleId }) => {
  const classes = useStyles();

  return (
    <div className={classes.ActionBox}>
      <div className={classes.control}>
        <ActionButton onClick={routes.createCheckIn}>Check in</ActionButton>
        <CollectionToggleButton userId={userId} articleId={articleId} />
        <WishlistToggleButton userId={userId} articleId={articleId} />
      </div>

      <div className="ratings">
        <Ratings userId={userId} articleId={articleId} />
      </div>
    </div>
  );
};

export default ActionBox;
