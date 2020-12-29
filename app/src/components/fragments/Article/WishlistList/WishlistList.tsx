import React from "react";
import { makeStyles } from "@material-ui/styles";
import WishlistArticleItemButton from "components/fragments/Article/WishlistArticleItem/Button";
import ThemeProvider from "components/ui/theme/ThemeProvider";

const useStyles = makeStyles({
  list: {
    display: "grid",
    gridGap: "16px",
  },
});

interface WishlistListProps {
  pointers: { articleId: string; userId: string }[];
  routes: {
    article: (article: string) => void;
  };
}

const WishlistList: React.FC<WishlistListProps> = ({ pointers, routes }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme="sky">
      <div className={classes.list}>
        {pointers.map((pointer) => (
          <WishlistArticleItemButton
            key={pointer.articleId}
            pointer={pointer}
            route={routes.article}
          />
        ))}
      </div>
    </ThemeProvider>
  );
};

export default WishlistList;
