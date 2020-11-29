import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import ActionButton from "components/ui/trigger/ActionButton";
import NameValueList from "components/ui/layout/NameValueList";
import NameValue from "components/ui/layout/NameValue";
import * as paths from "components/route/paths";
import { makeStyles } from "@material-ui/styles";
import { RatingAggregate } from "types/RatingAggregate";
import NumberedRating from "../NumberedRating";
import Collection from "../Collection";
import { useArticle } from "components/hooks/db/useArticles";
import { useUserArticle } from "components/hooks/db/useUserArticles";

const useStyles = makeStyles({
  ActionBox: {
    background: "#fff",
    borderRadius: "5px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
    color: "#838383",
    display: "flex",
    flexFlow: "column",
    fontSize: "12px",
    fontWeight: 500,
    justifyContent: "stretch",
    overflow: "hidden",
  },
  collection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridAutoFlow: "column",
    gridGap: "16px",
    padding: "16px",
  },
});

function calcAverageRating(agg: RatingAggregate): number {
  return agg.sum / agg.count;
}

interface ActionBoxProps {
  userId: string;
  articleId: string;
}

const ActionBox: React.FC<ActionBoxProps> = ({ userId, articleId }) => {
  const articleEntry = useArticle(articleId);
  const userArticleEntry = useUserArticle(userId, articleId);

  const history = useHistory();
  const goToCheckIn = useCallback(() => {
    const url = paths.articleCheckIn.url({ articleId });
    history.push(url);
  }, [articleId, history]);

  const article = articleEntry?.data;

  const averageRating = article?.ratingAggregate
    ? calcAverageRating(article.ratingAggregate)
    : null;

  const myRating = userArticleEntry?.data?.rating;

  const classes = useStyles();

  return (
    <div className={classes.ActionBox}>
      <ActionButton variant="action" onClick={goToCheckIn}>
        Check in
      </ActionButton>
      <NameValueList>
        <Collection userId={userId} articleId={articleId} />

        <NameValue
          name="Global rating"
          value={
            averageRating ? (
              <NumberedRating value={averageRating} max={5} />
            ) : (
              "-"
            )
          }
        />
        <NameValue
          name="My rating"
          value={
            myRating?.score ? (
              <NumberedRating value={myRating.score} max={5} />
            ) : (
              "-"
            )
          }
        />
        <NameValue name="Brand" value={article?.manufacturer || "-"} />
      </NameValueList>
    </div>
  );
};

export default ActionBox;
