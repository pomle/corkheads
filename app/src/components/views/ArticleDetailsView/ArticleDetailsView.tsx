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
import NameValue from "./components/NameValue";
import NameValueList from "./components/NameValueList";
import { RatingAggregate } from "types/types";
import NumberedRating from "./components/NumberedRating";
import Photo from "components/ui/layout/Photo";
import Collection from "./components/Collection";

const useStyles = makeStyles({
  photo: {
    height: "100vw",
    maxHeight: "400px",
  },
  collection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridAutoFlow: "column",
    gridGap: "16px",
    padding: "16px",
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
    width: "calc(100% - 40px)",
  },
});

function calcAverageRating(agg: RatingAggregate): number {
  return agg.sum / agg.count;
}

interface ArticleDetailsViewProps {
  nav: React.ReactNode;
  article: Article;
}

const ArticleDetailsView: React.FC<ArticleDetailsViewProps> = ({
  nav,
  article,
}) => {
  const history = useHistory();
  const goToCheckIn = useCallback(() => {
    const url = paths.articleCheckIn.url({ articleId: article.id });
    history.push(url);
  }, [article.id, history]);

  const { displayName, manufacturer, photoURL } = article.data;

  const averageRating = article.data.ratingAggregate
    ? calcAverageRating(article.data.ratingAggregate)
    : null;

  const classes = useStyles();

  return (
    <HeaderLayout>
      <ViewCap top>
        {nav}
        <ViewTitle title={displayName} />
      </ViewCap>
      <ViewBody>
        <div className={classes.photo}>
          <Photo url={photoURL} />
        </div>
        <div className={classes.actionBox}>
          <ActionButton variant="action" onClick={goToCheckIn}>
            Check in
          </ActionButton>
          <NameValueList>
            <Collection articleId={article.id} />

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
            <NameValue name="Brand" value={manufacturer} />
          </NameValueList>
        </div>
      </ViewBody>
    </HeaderLayout>
  );
};

export default ArticleDetailsView;
