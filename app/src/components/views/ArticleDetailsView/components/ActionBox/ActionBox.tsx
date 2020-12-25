import React from "react";
import ActionButton from "components/ui/trigger/ActionButton";
import { makeStyles } from "@material-ui/styles";
import { Colors, Theme } from "components/ui/theme/themes";
import ThemeProvider from "components/ui/theme/ThemeProvider";
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
        <ThemeProvider theme="sky">
          <CollectionToggleButton userId={userId} articleId={articleId} />
          <WishlistToggleButton userId={userId} articleId={articleId} />
        </ThemeProvider>
      </div>

      <div className={classes.ratings}>
        <ThemeProvider theme="cream">
          <Ratings userId={userId} articleId={articleId} />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ActionBox;
