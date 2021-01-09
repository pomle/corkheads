import React from "react";
import { makeStyles } from "@material-ui/styles";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { createCheckIn } from "types/CheckIn";
import { createUser } from "types/User";
import Image from "components/ui/layout/Image";
import { Colors } from "components/ui/theme/colors";
import AreaButton from "components/ui/trigger/AreaButton";
import UserItem from "components/fragments/User/UserItem";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import Score from "components/ui/indicators/Score";
import ArticleItem from "components/fragments/Article/ArticleItem";
import { useCheckIn } from "components/hooks/db/useCheckIns";
import { useUser } from "components/hooks/db/useUsers";
import { useUserVirtualArticle } from "components/hooks/db/useUserVirtualArticle";
import { useImage } from "components/hooks/db/useImages";
import Reactions from "./components/Reactions/Reactions";
import { useMe } from "components/hooks/useMe";

const useStyles = makeStyles({
  photo: {
    background: Colors.Slate,
    height: "calc(100vw - 32px)",
    maxHeight: "400px",
    width: "calc(100vw - 32px)",
  },
  summary: {
    background: Colors.BlueSmoke,
    borderRadius: "8px",
    margin: "16px auto",
    overflow: "hidden",
    width: "calc(100vw - 32px)",
  },
  score: {
    display: "flex",
    fontSize: "24px",
    justifyContent: "center",
    padding: "16px",
    "& .star.filled path": {
      fill: Colors.MarbleBlue,
    },
    "& .star.empty path": {
      fill: "none",
      stroke: Colors.MarbleBlue,
      strokeWidth: "4px",
    },
  },
  meta: {
    borderTop: `dashed 1px ${Colors.Navy}`,
    padding: "16px",
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
    margin: "16px",
  },
  comment: {
    color: Colors.MarbleBlue,
    fontSize: "14px",
    fontWeight: 700,
  },
  reactions: {
    margin: "16px",
  },
});

interface CheckInDetailsViewProps {
  nav: React.ReactNode;
  routes: {
    article: (articleId: string) => void;
    user: (userId: string) => void;
    picture: () => void;
  };
  checkInId: string;
}

const CheckInDetailsView: React.FC<CheckInDetailsViewProps> = ({
  nav,
  routes,
  checkInId,
}) => {
  const me = useMe()?.data;

  const checkIn = useCheckIn(checkInId)?.data || createCheckIn(checkInId);
  const { articleId, userId } = checkIn;

  const article = useUserVirtualArticle(userId, articleId);
  const user = useUser(userId)?.data || createUser(userId);

  const image = useImage(checkIn.imageId || article.imageId)?.data;

  const score = checkIn.rating.score;

  const classes = useStyles();

  return (
    <HeaderLayout>
      <ThemeProvider theme="dusk">
        <ViewCap>
          {nav}
          <ViewTitle title="Check in" />
        </ViewCap>
      </ThemeProvider>
      <ViewBody>
        <div className={classes.summary}>
          <AreaButton onClick={routes.picture} className={classes.photo}>
            <Image image={image} fit="cover" size="100vw" />
          </AreaButton>

          <div className={classes.score}>
            <Score score={score || 0} />
          </div>

          {checkIn.comment && (
            <div className={classes.meta}>
              <blockquote className={classes.comment}>
                {checkIn.comment}
              </blockquote>
            </div>
          )}

          <div className={classes.reactions}>
            {me && <Reactions checkInId={checkInId} userId={me.id} />}
            <div>{checkIn.reactionCount} reactions</div>
          </div>
        </div>

        <ThemeProvider theme="dusk">
          <div className={classes.checkIn}>
            <button
              type="button"
              onClick={() => routes.article(checkIn.articleId)}
            >
              <ArticleItem
                pointer={{
                  userId: user.id,
                  articleId: checkIn.articleId,
                }}
              />
            </button>
          </div>
        </ThemeProvider>

        <div className={classes.user}>
          <button type="button" onClick={() => routes.user(checkIn.userId)}>
            <UserItem pointer={{ userId: checkIn.userId }} />
          </button>
        </div>
      </ViewBody>
    </HeaderLayout>
  );
};

export default CheckInDetailsView;
