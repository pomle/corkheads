import React from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Article } from "types/Article";
import { makeStyles } from "@material-ui/styles";
import Photo from "components/ui/layout/Photo";
import ActionBox from "./components/ActionBox";
import UserSections from "./components/UserSections";
import { useArticle } from "components/hooks/db/useArticles";
import Themer from "components/ui/theme/Themer";
import { Theme } from "components/ui/theme/themes";
import ViewHead from "components/ui/layout/ViewHead";
import ArticleCheckInsSection from "./components/ArticleCheckInsSection";

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    textAlign: "center",
  },
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
  checkInsSection: {
    margin: "16px",
  },
}));

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
    <Themer theme="cream">
      <HeaderLayout>
        <ViewCap>
          {nav}
          <ViewHead>
            <div className={classes.head}>
              <h1>{displayName}</h1>
            </div>
          </ViewHead>
        </ViewCap>
        <ViewBody>
          <div className={classes.photo}>
            <Photo url={photoURL} />
          </div>

          <div className={classes.actionBox}>
            <Themer theme="pure">
              <ActionBox userId={userId} articleId={articleId} />
            </Themer>
          </div>

          <div className={classes.userSection}>
            <UserSections userId={userId} articleId={articleId} />
          </div>

          <div className={classes.checkInsSection}>
            <ArticleCheckInsSection articleId={articleId} />
          </div>
        </ViewBody>
      </HeaderLayout>
    </Themer>
  );
};

export default ArticleDetailsView;
