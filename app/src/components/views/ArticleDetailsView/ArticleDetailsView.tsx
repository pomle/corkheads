import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Article } from "types/types";
import ActionButton from "components/ui/trigger/ActionButton";
import * as paths from "components/route/paths";
import { makeStyles } from "@material-ui/styles";
import Rating from "components/ui/indicators/Rating";
import NameValue from "./components/NameValue";
import NameValueList from "./components/NameValueList";

type StyleProps = {
  photoURL?: string;
};

function backgroundImage({ photoURL }: StyleProps) {
  if (photoURL) {
    return `url(${photoURL})`;
  }
  return "none";
}

const useStyles = makeStyles({
  photo: {
    background: "#c9c9c9",
    backgroundImage,
    backgroundPosition: "center",
    backgroundSize: "cover",
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

  const data = article.data;

  const averageRating = 0.7;

  const classes = useStyles({ photoURL: article.data.photoURL });

  return (
    <HeaderLayout>
      <ViewCap top>
        {nav}
        <ViewTitle title={data.displayName} />
      </ViewCap>
      <ViewBody>
        <div className={classes.photo}></div>
        <div className={classes.actionBox}>
          <ActionButton variant="action" onClick={goToCheckIn}>
            Check in
          </ActionButton>
          <NameValueList>
            <NameValue name="Manufacturer" value={data.manufacturer} />
            <NameValue
              name="Average rating"
              value={
                <>
                  <Rating rating={averageRating} />
                </>
              }
            />
          </NameValueList>
        </div>
      </ViewBody>
    </HeaderLayout>
  );
};

export default ArticleDetailsView;
