import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Article } from "types/article";
import ActionButton from "components/ui/trigger/ActionButton";
import * as paths from "components/route/paths";
import { makeStyles } from "@material-ui/styles";
import { CheckIn } from "types/checkIn";
import Photo from "components/ui/layout/Photo";

const useStyles = makeStyles({
  photo: {
    height: "100vw",
    maxHeight: "400px",
  },
  actionBox: {
    background: "#fff",
    borderRadius: "5px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
    color: "#838383",
    display: "flex",
    flexFlow: "column",
    fontSize: "12px",
    fontWeight: 500,
    justifyContent: "stretch",
    margin: "auto",
    marginTop: "-80px",
    overflow: "hidden",
    width: "80%",
  },
});

function resolvePhotoURL(checkIn: CheckIn, article: Article) {
  if (checkIn.data.photoURL) {
    return checkIn.data.photoURL;
  }

  if (article.data.photoURL) {
    return article.data.photoURL;
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
      <ViewCap top>
        {nav}
        <ViewTitle title="Check in" />
      </ViewCap>
      <ViewBody>
        <div className={classes.photo}>
          <Photo url={photoURL} />
        </div>
        <div className={classes.actionBox}>
          <ActionButton
            variant="action"
            onClick={() => goToArticle(checkIn.data.articleId)}
          >
            Go to Article
          </ActionButton>
        </div>
      </ViewBody>
    </HeaderLayout>
  );
};

export default CheckInDetailsView;
