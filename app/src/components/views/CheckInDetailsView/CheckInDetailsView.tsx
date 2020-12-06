import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Article } from "types/Article";
import * as paths from "components/route/paths";
import { makeStyles } from "@material-ui/styles";
import { CheckIn } from "types/CheckIn";
import Photo from "components/ui/layout/Photo";
import CheckInItem from "components/fragments/CheckIn/CheckInItem";
import { Colors } from "components/ui/theme/themes";

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
  checkIn: CheckIn;
  article: Article;
}

const CheckInDetailsView: React.FC<CheckInDetailsViewProps> = ({
  nav,
  checkIn,
  article,
}) => {
  const history = useHistory();

  const goToArticle = useCallback(
    (articleId: string) => {
      const url = paths.articleView.url({ articleId });
      history.push(url);
    },
    [history]
  );

  const photoURL = resolvePhotoURL(checkIn, article);

  const classes = useStyles();

  return (
    <HeaderLayout>
      <ViewCap>
        {nav}
        <ViewTitle title="Check in" />
      </ViewCap>
      <ViewBody>
        <div className={classes.photo}>
          <Photo url={photoURL} size="contain" />
        </div>

        <div className={classes.checkIn}>
          <button type="button" onClick={() => goToArticle(checkIn.articleId)}>
            <CheckInItem checkIn={checkIn} article={article} />
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
