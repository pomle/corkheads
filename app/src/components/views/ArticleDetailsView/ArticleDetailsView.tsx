import React from "react";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Article } from "types/Article";
import { makeStyles } from "@material-ui/styles";
import Photo from "components/ui/layout/Photo";
import ActionBox from "./components/ActionBox";
import UserSections from "./components/UserSections";
import { useArticle } from "components/hooks/db/useArticles";

const useStyles = makeStyles({
  photo: {
    height: "100vw",
    maxHeight: "400px",
    position: "relative",
    zIndex: 2,
  },
  actionBox: {
    margin: "auto",
    marginTop: "-80px",
    width: "calc(100% - 48px)",
    position: "relative",
    zIndex: 3,
  },
  userSection: {
    margin: "32px 0",
  },
});

interface ArticleDetailsViewProps {
  nav: React.ReactNode;
  userId: string;
  articleId: string;
}

const PLACEHOLDER: Article = {
  id: "",
  displayName: "Yeet",
  manufacturer: "",
};

const ArticleDetailsView: React.FC<ArticleDetailsViewProps> = ({
  nav,
  userId,
  articleId,
}) => {
  const articleEntry = useArticle(articleId);

  const { displayName, photoURL } = articleEntry?.data || PLACEHOLDER;

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
          <ActionBox userId={userId} articleId={articleId} />
        </div>

        <div className={classes.userSection}>
          <UserSections userId={userId} articleId={articleId} />
        </div>
      </ViewBody>
    </HeaderLayout>
  );
};

export default ArticleDetailsView;
