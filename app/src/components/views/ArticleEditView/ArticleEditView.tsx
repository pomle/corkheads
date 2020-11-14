import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Article } from "types/types";
import ActionButton from "components/ui/trigger/ActionButton";
import * as paths from "components/route/paths";
import { useDB } from "components/hooks/useDB";
import Photo from "./components/Photo";

const useStyles = makeStyles({
  form: {
    background: "#fff",
    color: "#5a5a5a",
    padding: "24px",
    "& > .content": {
      display: "grid",
      gridAutoFlow: "row",
      gridGap: "16px",
    },
    "& .fields": {
      display: "grid",
      gridAutoFlow: "row",
      gridGap: "16px",
    },
    "& input": {
      background: "#f9f9f9",
      border: "solid 2px #e2e2e2",
      color: "#838383",
      fontSize: "16px",
      fontWeight: 400,
    },
  },
});

function isArticleValid(article: Article) {
  const data = article.data;
  return data.displayName.length > 0;
}

interface ArticleEditViewProps {
  nav: React.ReactNode;
  user: firebase.User;
  article: Article;
}

const ArticleEditView: React.FC<ArticleEditViewProps> = ({
  nav,
  user,
  article: initial,
}) => {
  const history = useHistory();

  const goToArticle = useCallback(
    (articleId: string) => {
      const url = paths.articleView.url({ articleId });
      history.push(url);
    },
    [history]
  );

  const [article, setArticle] = useState<Article>(initial);

  const updateArticle = useCallback(
    (update: Partial<Article["data"]>) => {
      setArticle((article) => ({
        ...article,
        data: {
          ...article.data,
          ...update,
        },
      }));
    },
    [setArticle]
  );

  const setDisplayName = useCallback(
    (displayName: string) => {
      updateArticle({ displayName });
    },
    [updateArticle]
  );

  const setManufacturer = useCallback(
    (manufacturer: string) => {
      updateArticle({ manufacturer });
    },
    [updateArticle]
  );

  const db = useDB();

  const commitArticle = useCallback(() => {
    const data = {
      ...article.data,
      userId: user.uid,
    };

    db.collection("articles")
      .add(data)
      .then((result) => {
        goToArticle(result.id);
      });
  }, [user, article, goToArticle, db]);

  const canSave = isArticleValid(article);

  const classes = useStyles();

  return (
    <HeaderLayout>
      <ViewCap top>
        {nav}
        <ViewTitle title="Add drink" />
      </ViewCap>
      <ViewBody>
        <form className={classes.form}>
          <div className="content">
            <div className="fields">
              <input
                type="text"
                placeholder="Drink name"
                value={article.data.displayName}
                onChange={(event) => setDisplayName(event.target.value)}
              />

              <input
                type="text"
                placeholder="Manufacturer"
                value={article.data.manufacturer}
                onChange={(event) => setManufacturer(event.target.value)}
              />
            </div>

            <Photo />

            <ActionButton
              disabled={!canSave}
              variant="action"
              onClick={commitArticle}
            >
              Add drink
            </ActionButton>
          </div>
        </form>
      </ViewBody>
    </HeaderLayout>
  );
};

export default ArticleEditView;
