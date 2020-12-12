import React from "react";
import { makeStyles } from "@material-ui/styles";
import { RatingAggregate } from "types/RatingAggregate";
import { useArticle } from "components/hooks/db/useArticles";
import { useUserArticle } from "components/hooks/db/useUserArticles";
import { Colors, Theme } from "components/ui/theme/themes";
import NumberedRating from "./components/NumberedRating";

const useStyles = makeStyles((theme: Theme) => ({
  Ratings: {
    display: "grid",
    gridGap: "8px",
    gridTemplateColumns: "1fr 1fr",
    "& > div": {
      alignItems: "center",
      background: Colors.Milk,
      borderRadius: "8px",
      color: theme.color.accent,
      lineHeight: 1.5,
      display: "flex",
      flexFlow: "column",
      padding: "16px",
    },
  },
}));

function calcAverageRating(agg: RatingAggregate): number {
  return agg.sum / agg.count;
}

interface RatingsProps {
  userId: string;
  articleId: string;
}

const Ratings: React.FC<RatingsProps> = ({ userId, articleId }) => {
  const article = useArticle(articleId)?.data;
  const userArticle = useUserArticle(userId, articleId)?.data;

  const averageRating = article?.ratingAggregate
    ? calcAverageRating(article.ratingAggregate)
    : null;

  const myRating = userArticle?.rating;

  const classes = useStyles();

  return (
    <div className={classes.Ratings}>
      <div>
        {averageRating ? <NumberedRating value={averageRating} max={5} /> : "-"}
        <div>Corkheads rating</div>
      </div>
      <div>
        {myRating?.score ? (
          <NumberedRating value={myRating.score} max={5} />
        ) : (
          "-"
        )}
        <div>My rating</div>
      </div>
    </div>
  );
};

export default Ratings;
