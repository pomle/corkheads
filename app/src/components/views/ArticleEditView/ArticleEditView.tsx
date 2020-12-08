import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import ViewTitle from "components/ui/layout/ViewTitle";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Article } from "types/Article";
import * as paths from "components/route/paths";
import { User } from "types/User";
import { useBottling, useCommitArticle } from "./hooks";
import BottlingUserInput from "components/fragments/Bottling/BottlingUserInput";
import { Bottling } from "types/Bottling";
import PhotoInput from "../CheckInCreateView/component/PhotoInput";
import BurgerLayout from "components/ui/layout/BurgerLayout";
import Themer from "components/ui/theme/Themer";
import ButtonField from "components/ui/layout/ButtonField";
import MainButton from "components/ui/trigger/MainButton/MainButton";
import Input from "components/ui/input/Input/Input";
import { useAsyncCallback } from "components/hooks/useAsyncCallback";

type StyleProps = {
  busy: boolean;
};

const useStyles = makeStyles({
  form: {
    padding: "24px",
    "& > .content": {
      display: "grid",
      filter: (props: StyleProps) =>
        props.busy ? "grayscale(0.25) opacity(0.5)" : "none",
      gridAutoFlow: "row",
      gridGap: "16px",
      pointerEvents: (props: StyleProps) => (props.busy ? "none" : "all"),
    },
    "& .fields": {
      display: "grid",
      gridAutoFlow: "row",
      gridGap: "16px",
    },
    "& input": {
      fontSize: "16px",
    },
    "& .photo": {},
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

  const handleSave = useAsyncCallback(
    useCallback(async () => {
      const ref = await commitArticle({ user, article, file });
      const articleId = ref.id;
      goToArticle(articleId);
    }, [file, user, article, commitArticle, goToArticle])
  );

  const bottling = useBottling(article);

  const canSave = isArticleValid(article) && !handleSave.busy;

  const classes = useStyles({ busy: handleSave.busy });

  return (
    <BurgerLayout>
      <Themer theme="dusk">
        <ViewCap>
          {nav}
          <ViewTitle title="Add drink" />
        </ViewCap>
      </Themer>
      <ViewBody>
        <form className={classes.form}>
          <div className="content">
            <div className="fields">
              <Input
                type="text"
                placeholder="Display name"
                value={article.displayName}
                onChange={setDisplayName}
              />
            </div>

            <div className="photo" onClick={clearPhoto}>
              <PhotoInput photoURL={photoURL} onFile={handleFile} />
            </div>

            <BottlingUserInput bottling={bottling} onChange={setBottling} />
          </div>
        </form>
      </ViewBody>
      <ButtonField>
        <MainButton
          disabled={!canSave}
          busy={handleSave.busy}
          onClick={handleSave.callback}
        >
          Add now
        </MainButton>
      </ButtonField>
    </BurgerLayout>
  );
};

export default ArticleEditView;
