import React from "react";
import { makeStyles } from "@material-ui/styles";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import CollectionArticleItemButton from "../CollectionArticleItem/Button";

const useStyles = makeStyles({
  CollectionArticleList: {
    display: "grid",
    gap: "16px",
    gridTemplateColumns: "repeat(auto-fit, minmax(154px, 1fr))",
    "& > *": {
      alignSelf: "start",
      justifySelf: "stretch",
    },
  },
});

interface CollectionArticleListProps {
  pointers: { articleId: string; userId: string }[];
  toArticle: (articleId: string) => void;
}

const CollectionArticleList: React.FC<CollectionArticleListProps> = ({
  pointers,
  toArticle,
}) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme="sky">
      <div className={classes.CollectionArticleList}>
        {pointers.map((pointer) => {
          return (
            <CollectionArticleItemButton
              key={pointer.articleId}
              pointer={pointer}
              toArticle={toArticle}
            />
          );
        })}
      </div>
    </ThemeProvider>
  );
};

export default CollectionArticleList;
