import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Article } from "types/Article";
import ActionButton from "components/ui/trigger/ActionButton";
import * as paths from "components/route/paths";
import { User } from "types/User";
import ImageSelect from "components/ui/trigger/ImageSelect";
import { useCommitArticle } from "./hooks";
import Photo from "components/ui/layout/Photo";
import BottlingUserInput from "components/fragments/Bottling/BottlingUserInput";
import { Bottling } from "types/Bottling";

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
      border: "dashed 2px #e2e2e2",
      display: "flex",
      fontSize: "18px",
      fontWeight: 500,
      justifyContent: "center",
      height: "200px",
      margin: "auto",
      width: "200px",
    },
  },
});

function isArticleValid(article: Article) {
  return article.displayName.length > 0;
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
    (update: Partial<Article>) => {
      setArticle((article) => ({
        ...article,
        ...update,
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

  const setBottling = useCallback(
    (bottling: Bottling) => {
      updateArticle({ bottling });
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
                placeholder="Display name"
                value={article.displayName}
                onChange={(event) => setDisplayName(event.target.value)}
              />
            </div>

            {article.bottling && (
              <BottlingUserInput
                bottling={article.bottling}
                onChange={setBottling}
              />
            )}

            {photoURL ? (
              <div className="photo" onClick={clearPhoto}>
                <Photo url={photoURL} />
              </div>
            ) : (
              <ImageSelect onFile={handleFile}>
                <div className="photo">Upload Photo</div>
              </ImageSelect>
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
