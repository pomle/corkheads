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
import ThemeProvider from "components/ui/theme/ThemeProvider";
import { Theme } from "components/ui/theme/themes";
import ViewHead from "components/ui/layout/ViewHead";
import AreaButton from "components/ui/trigger/AreaButton";
import { useUserVirtualArticle } from "components/hooks/db/useUserVirtualArticle";

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    textAlign: "center",
  },
  photo: {
    background: "#00000020",
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

const PLACEHOLDER: Article = {
  id: "",
  displayName: "Yeet",
};

interface ArticleDetailsViewProps {
  nav: React.ReactNode;
  routes: {
    picture: () => void;
    createCheckIn: () => void;
    checkIn: (checkInId: string) => void;
  };
  userId: string;
  articleId: string;
}

const ArticleDetailsView: React.FC<ArticleDetailsViewProps> = ({
  nav,
  routes,
  userId,
  articleId,
}) => {
  const article = useUserVirtualArticle(userId, articleId) || PLACEHOLDER;

  const { displayName, photoURL } = article;

  const classes = useStyles();

  return (
    <ThemeProvider theme="cream">
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
          <AreaButton onClick={routes.picture} className={classes.photo}>
            <Photo url={photoURL} />
          </AreaButton>

          <div className={classes.actionBox}>
            <ThemeProvider theme="pure">
              <ActionBox
                routes={routes}
                userId={userId}
                articleId={articleId}
              />
            </ThemeProvider>
          </div>

          <div className={classes.userSection}>
            <ThemeProvider theme="pure">
              <UserSections userId={userId} articleId={articleId} />
            </ThemeProvider>
          </div>
        </ViewBody>
      </HeaderLayout>
    </ThemeProvider>
  );
};

export default ArticleDetailsView;
