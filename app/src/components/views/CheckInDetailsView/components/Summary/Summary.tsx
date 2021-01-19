import React from "react";
import { makeStyles } from "@material-ui/styles";
import { createCheckIn } from "types/CheckIn";
import { createUser } from "types/User";
import Image from "components/ui/layout/Image";
import { Colors } from "components/ui/theme/colors";
import AreaButton from "components/ui/trigger/AreaButton";
import UserItem from "components/fragments/User/UserItem";
import Score from "components/ui/indicators/Score";
import ArticleItem from "components/fragments/Article/ArticleItem";
import { useCheckIn } from "components/hooks/db/useCheckIns";
import { useUser } from "components/hooks/db/useUsers";
import { useUserVirtualArticle } from "components/hooks/db/useUserVirtualArticle";
import ArticleImagePlaceholder from "assets/graphics/drink-placeholder.svg";
import { useImage } from "components/hooks/db/useImages";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  Summary: {
    background: theme.color.surface,
    borderRadius: "8px",
  },
  photo: {
    background: Colors.Sky,
    height: "calc(100vw - 32px)",
    maxHeight: "400px",
    width: "calc(100vw - 32px)",
  },
  score: {
    display: "flex",
    fontSize: "24px",
    justifyContent: "center",
    padding: "16px",
    "& .star.filled path": {
      fill: Colors.Gold,
    },
  },
  meta: {
    padding: "24px",
  },
  article: {
    display: "flex",
    justifyContent: "center",
    marginTop: "-34px",
    position: "relative",
    zIndex: 2,
    "& button": {
      width: "calc(100% - 32px)",
      "& > div": {
        boxShadow: "0 2px 6px -4px black",
      },
    },
  },
  checkIn: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "stretch",
    margin: "16px",
  },
  user: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "stretch",
    padding: "16px",
  },
  comment: {
    fontSize: "16px",
  },
}));

interface SummaryProps {
  checkInId: string;
  routes: {
    article: (articleId: string) => void;
    user: (userId: string) => void;
    picture: () => void;
  };
}

const Summary: React.FC<SummaryProps> = ({ checkInId, routes }) => {
  const checkIn = useCheckIn(checkInId)?.data || createCheckIn(checkInId);
  const { articleId, userId } = checkIn;

  const article = useUserVirtualArticle(userId, articleId);
  const user = useUser(userId)?.data || createUser(userId);

  const image =
    useImage(checkIn.imageId || article.imageId)?.data ||
    ArticleImagePlaceholder;

  const score = checkIn.rating.score;

  const classes = useStyles();

  return (
    <div className={classes.Summary}>
      <div className={classes.user}>
        <button type="button" onClick={() => routes.user(checkIn.userId)}>
          <UserItem pointer={{ userId: checkIn.userId }} />
        </button>
      </div>

      <AreaButton onClick={routes.picture} className={classes.photo}>
        <Image image={image} fit="cover" size="100vw" />
      </AreaButton>

      <div className={classes.article}>
        <button type="button" onClick={() => routes.article(checkIn.articleId)}>
          <ArticleItem
            pointer={{
              userId: user.id,
              articleId: checkIn.articleId,
            }}
          />
        </button>
      </div>

      <div className={classes.score}>
        <Score score={score || 0} />
      </div>

      {checkIn.comment && (
        <div className={classes.meta}>
          <blockquote className={classes.comment}>{checkIn.comment}</blockquote>
        </div>
      )}
    </div>
  );
};

export default Summary;
