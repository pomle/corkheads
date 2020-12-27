import React from "react";
import { makeStyles } from "@material-ui/styles";
import { RatingAggregate } from "types/RatingAggregate";
import { Theme } from "components/ui/theme/themes";
import { Colors } from "components/ui/theme/colors";
import NumberedRating from "./components/NumberedRating";
import { useUserVirtualArticle } from "components/hooks/db/useUserVirtualArticle";

const useStyles = makeStyles((theme: Theme) => ({
  Ratings: {
    borderTop: `dashed 1px ${theme.color.panel}`,
    color: Colors.X1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    "& em": {
      color: theme.color.accent,
      fontStyle: "normal",
      fontWeight: 700,
    },
    "& > div": {
      alignItems: "center",
      lineHeight: 1.5,
      display: "flex",
      flexFlow: "column",
      padding: "16px",
      "&:first-child": {
        borderRight: `dashed 1px ${theme.color.panel}`,
      },
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
  const article = useUserVirtualArticle(userId, articleId);

  const averageRating = article?.ratingAggregate
    ? calcAverageRating(article.ratingAggregate)
    : null;

  const myRating = article?.rating;

  const classes = useStyles();

  return (
    <div className={classes.Ratings}>
      <div>
        <em>
          {averageRating ? (
            <NumberedRating value={averageRating} max={5} />
          ) : (
            "-"
          )}
        </em>
        <div>Corkheads</div>
      </div>
      <div>
        <em>
          {myRating?.score ? (
            <NumberedRating value={myRating.score} max={5} />
          ) : (
            "-"
          )}
        </em>
        <div>You</div>
      </div>
    </div>
  );
};

export default Ratings;
