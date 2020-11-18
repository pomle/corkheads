import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Article } from "types/article";
import ActionButton from "components/ui/trigger/ActionButton";
import * as paths from "components/route/paths";
import { User } from "types/user";
import FileSelect from "components/ui/trigger/FileSelect";
import { useCommitArticle } from "./hooks";

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
    "& .photo": {
      alignItems: "center",
      backgroundColor: "#f9f9f9",
      border: "dashed 2px #e2e2e2",
      display: "flex",
      fontSize: "18px",
      fontWeight: 500,
      justifyContent: "center",
      height: "200px",
      margin: "auto",
      width: "200px",
      "& > img": {
        height: "100%",
        objectFit: "contain",
        objectPosition: "center",
        width: "100%",
      },
    },
  },
});

function isArticleValid(article: Article) {
  const data = article.data;
  return data.displayName.length > 0;
}

interface ArticleEditViewProps {
  nav: React.ReactNode;
  user: User;
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

  const [photoURL, setPhotoURL] = useState<string>();
  const [file, setFile] = useState<File>();
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

  const handleFile = useCallback((file: File) => {
    setFile(file);

    const url = URL.createObjectURL(file);
    setPhotoURL(url);
  }, []);

  const clearPhoto = useCallback(() => {
    setFile(undefined);
    setPhotoURL(undefined);
  }, [setFile, setPhotoURL]);

  const commitArticle = useCommitArticle();

  const handleSave = useCallback(() => {
    commitArticle({ user, article, file }).then((result) => {
      const articleId = result.id;
      goToArticle(articleId);
    });
  }, [file, user, article, commitArticle, goToArticle]);

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

            {photoURL ? (
              <div className="photo" onClick={clearPhoto}>
                <img src={photoURL} alt="Preview" />
              </div>
            ) : (
              <FileSelect onFile={handleFile}>
                <div className="photo">Upload Photo</div>
              </FileSelect>
            )}

            <ActionButton
              disabled={!canSave}
              variant="action"
              onClick={handleSave}
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
