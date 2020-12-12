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
import AreaButton from "components/ui/trigger/AreaButton";
import { resolvePhoto } from "lib/resourceRouting";

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
  const articleEntry = useArticle(articleId);
  const article = articleEntry?.data;

  const { displayName } = article || PLACEHOLDER;
  const imageRef = resolvePhoto(article);

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
          <AreaButton onClick={routes.picture} className={classes.photo}>
            {imageRef && <Photo url={imageRef.id} />}
          </AreaButton>

          <div className={classes.actionBox}>
            <Themer theme="pure">
              <ActionBox
                routes={routes}
                userId={userId}
                articleId={articleId}
              />
            </Themer>
          </div>

          <div className={classes.userSection}>
            <UserSections userId={userId} articleId={articleId} />
          </div>
        </ViewBody>
      </HeaderLayout>
    </Themer>
  );
};

export default ArticleDetailsView;
