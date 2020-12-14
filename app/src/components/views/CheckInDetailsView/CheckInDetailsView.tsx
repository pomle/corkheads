import React from "react";
import { makeStyles } from "@material-ui/styles";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Article } from "types/Article";
import { CheckIn } from "types/CheckIn";
import { User } from "types/User";
import Photo from "components/ui/layout/Photo";
import CheckInItem from "components/fragments/CheckIn/CheckInItem";
import { Colors } from "components/ui/theme/themes";
import AreaButton from "components/ui/trigger/AreaButton";
import UserItem from "components/fragments/User/UserItem";

const useStyles = makeStyles({
  photo: {
    background: "#0003",
    height: "100vw",
    maxHeight: "400px",
  },
  checkIn: {
    background: "#0003",
    borderRadius: "16px",
    display: "flex",
    flexFlow: "column",
    justifyContent: "stretch",
    margin: "16px",
    padding: "8px",
  },
  user: {
    background: "#0003",
    borderRadius: "16px",
    display: "flex",
    flexFlow: "column",
    justifyContent: "stretch",
    margin: "16px",
    padding: "8px",
  },
  comment: {
    color: Colors.Gold,
    fontFamily: "Bree Serif",
    fontSize: "16px",
    margin: "16px",
  },
});

function resolvePhotoURL(checkIn: CheckIn, article: Article) {
  if (checkIn.photoURL) {
    return checkIn.photoURL;
  }

  if (article.photoURL) {
    return article.photoURL;
  }

  return;
}

interface CheckInDetailsViewProps {
  nav: React.ReactNode;
  routes: {
    article: (articleId: string) => void;
    picture: () => void;
  };
  checkIn: CheckIn;
  article: Article;
  user: User;
}

const CheckInDetailsView: React.FC<CheckInDetailsViewProps> = ({
  nav,
  routes,
  checkIn,
  article,
  user,
}) => {
  const photoURL = resolvePhotoURL(checkIn, article);

  const classes = useStyles();

  return (
    <HeaderLayout>
      <ViewCap>
        {nav}
        <ViewTitle title="Check in" />
      </ViewCap>
      <ViewBody>
        <AreaButton onClick={routes.picture} className={classes.photo}>
          <Photo url={photoURL} size="contain" />
        </AreaButton>

        <div className={classes.checkIn}>
          <button
            type="button"
            onClick={() => routes.article(checkIn.articleId)}
          >
            <CheckInItem checkIn={checkIn} article={article} />
          </button>
        </div>

        <div className={classes.user}>
          <button type="button">
            <UserItem user={user} />
          </button>
        </div>

        {checkIn.comment && (
          <blockquote className={classes.comment}>{checkIn.comment}</blockquote>
        )}
      </ViewBody>
    </HeaderLayout>
  );
};

export default CheckInDetailsView;
