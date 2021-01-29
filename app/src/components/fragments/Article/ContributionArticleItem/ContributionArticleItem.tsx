import React from "react";
import { makeStyles } from "@material-ui/styles";
import CutoutImageItem from "components/ui/layout/CutoutImageItem";
import { Theme } from "components/ui/theme/themes";
import BottlingMeta from "components/fragments/Bottling/BottlingMeta";
import PassedTime from "components/ui/format/PassedTime";
import { useUserVirtualArticle } from "components/hooks/db/useUserVirtualArticle";
import ThemeProvider from "components/ui/theme/ThemeProvider";

const useStyles = makeStyles((theme: Theme) => ({
  ContributionArticleItem: {
    display: "grid",
    gridGap: "4px",
    padding: "8px",
    "& > .displayName": {
      color: theme.color.title,
      fontSize: "14px",
      fontWeight: 700,
    },
    "& > .meta": {
      color: theme.color.text,
      fontSize: "12px",
      fontWeight: 500,
    },
    "& > .date": {
      color: theme.color.text,
      fontSize: "10px",
      fontWeight: 500,
    },
  },
}));

interface ContributionArticleItemProps {
  pointer: { articleId: string; userId: string };
}

const ContributionArticleItem: React.FC<ContributionArticleItemProps> = ({
  pointer: { articleId, userId },
}) => {
  const article = useUserVirtualArticle(userId, articleId);

  const { displayName } = article;
  const addedDate = article.timestamp;

  const classes = useStyles();

  return (
    <ThemeProvider theme="sky">
      <CutoutImageItem imageId={article.imageId}>
        <div className={classes.ContributionArticleItem}>
          <div className="displayName">{displayName}</div>
          {article.bottling && (
            <div className="meta">
              <BottlingMeta bottling={article.bottling} />
            </div>
          )}
          {addedDate && (
            <div className="date">
              In catalog since <PassedTime date={addedDate} />
            </div>
          )}
        </div>
      </CutoutImageItem>
    </ThemeProvider>
  );
};

export default ContributionArticleItem;
