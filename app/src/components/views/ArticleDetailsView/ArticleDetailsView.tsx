import React from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { makeStyles } from "@material-ui/styles";
import ActionBox from "./components/ActionBox";
import UserSections from "./components/UserSections";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import { Theme } from "components/ui/theme/themes";
import ViewTitle from "components/ui/layout/ViewTitle";
import Image from "components/ui/layout/Image";
import AreaButton from "components/ui/trigger/AreaButton";
import { useUserVirtualArticle } from "components/hooks/db/useUserVirtualArticle";
import { useImage } from "components/hooks/db/useImages";
import ArticleCheckInsSection from "./components/ArticleCheckInsSection";
import LazyRender from "components/ui/trigger/LazyRender/LazyRender";
import ArticleImagePlaceholder from "assets/graphics/drink-placeholder.svg";
import NavigationBar, { Nav } from "components/ui/layout/NavigationBar";

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    textAlign: "center",
  },
  photo: {
    background: theme.color.panel,
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
  nav: Nav;
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
  const article = useUserVirtualArticle(userId, articleId);
  const image = useImage(article.imageId)?.data;

  const { displayName } = article;

  const classes = useStyles();

  return (
    <ThemeProvider theme="pure">
      <HeaderLayout>
        <ViewCap>
          <NavigationBar nav={nav}>
            <ViewTitle title={displayName} />
          </NavigationBar>
        </ViewCap>
        <ViewBody>
          <AreaButton onClick={routes.picture} className={classes.photo}>
            <Image
              image={image}
              placeholder={ArticleImagePlaceholder}
              size="100vw"
            />
          </AreaButton>

          <div className={classes.actionBox}>
            <ActionBox routes={routes} userId={userId} articleId={articleId} />
          </div>

          <div className={classes.userSection}>
            <UserSections userId={userId} articleId={articleId} />
          </div>

          <LazyRender>
            {() => (
              <ArticleCheckInsSection articleId={article.id} routes={routes} />
            )}
          </LazyRender>
        </ViewBody>
      </HeaderLayout>
    </ThemeProvider>
  );
};

export default ArticleDetailsView;
