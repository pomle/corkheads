import React from "react";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Article } from "types/Article";
import { makeStyles } from "@material-ui/styles";
import Photo from "components/ui/layout/Photo";
import ActionBox from "./components/ActionBox";
import { useUser } from "components/hooks/useUser";
import UserSections from "./components/UserSections";

const useStyles = makeStyles({
  photo: {
    height: "100vw",
    maxHeight: "400px",
  },
  actionBox: {
    margin: "auto",
    marginTop: "-80px",
    width: "80%",
  },
  userSection: {
    margin: "32px 0",
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
  const user = useUser();

  const { displayName, photoURL } = article;

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
          {user && <ActionBox article={article} user={user} />}
        </div>

        {user && (
          <div className={classes.userSection}>
            <UserSections user={user} article={article} />
          </div>
        )}
      </ViewBody>
    </HeaderLayout>
  );
};

export default ArticleDetailsView;
