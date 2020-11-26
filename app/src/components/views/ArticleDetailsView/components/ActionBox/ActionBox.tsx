import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Article } from "types/Article";
import ActionButton from "components/ui/trigger/ActionButton";
import * as paths from "components/route/paths";
import { makeStyles } from "@material-ui/styles";
import NameValue from "../NameValue";
import NameValueList from "../NameValueList";
import { RatingAggregate } from "types/RatingAggregate";
import NumberedRating from "../NumberedRating";
import Collection from "../Collection";
import { UserArticle } from "types/UserArticle";
import { Entry } from "types/Entry";

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
  articleEntry: Entry<Article>;
  userArticleEntry: Entry<UserArticle>;
}

const ActionBox: React.FC<ActionBoxProps> = ({
  articleEntry,
  userArticleEntry,
}) => {
  const history = useHistory();
  const goToCheckIn = useCallback(() => {
    const url = paths.articleCheckIn.url({ articleId: articleEntry.id });
    history.push(url);
  }, [articleEntry.id, history]);

  const article = articleEntry.data;

  const averageRating = article?.ratingAggregate
    ? calcAverageRating(article.ratingAggregate)
    : null;

  const myRating = userArticleEntry.data?.rating;

  const classes = useStyles();

  return (
    <div className={classes.ActionBox}>
      <ActionButton variant="action" onClick={goToCheckIn}>
        Check in
      </ActionButton>
      <NameValueList>
        <Collection userArticleEntry={userArticleEntry} />

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
          value={myRating ? <NumberedRating value={myRating} max={5} /> : "-"}
        />
        <NameValue name="Brand" value={article?.manufacturer || "-"} />
      </NameValueList>
    </div>
  );
};

export default ActionBox;
