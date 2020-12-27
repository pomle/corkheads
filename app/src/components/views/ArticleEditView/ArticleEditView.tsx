import React, { useCallback, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import ViewTitle from "components/ui/layout/ViewTitle";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Article } from "types/Article";
import { useBottling, useCommitArticle } from "./hooks";
import BottlingUserInput from "components/fragments/Bottling/BottlingUserInput";
import { Bottling } from "types/Bottling";
import PhotoInput from "../CheckInCreateView/component/PhotoInput";
import BurgerLayout from "components/ui/layout/BurgerLayout";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import ButtonField from "components/ui/layout/ButtonField";
import MainButton from "components/ui/trigger/MainButton/MainButton";
import Input from "components/ui/input/Input/Input";
import { useAsyncCallback } from "components/hooks/useAsyncCallback";
import { debounce } from "lib/debounce";
import PreviewArticleItem from "./components/PreviewArticleItem/PreviewArticleItem";
import { getPreviewScore } from "./score";

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
  preview: {
    padding: "16px",
  },
});

function isArticleValid(article: Article) {
  if (!article.displayName) {
    return false;
  }
  return article.displayName.length > 0;
}

interface ArticleEditViewProps {
  nav: React.ReactNode;
  article: Article;
  routes: {
    article: (articleId: string) => void;
  };
}

const ArticleEditView: React.FC<ArticleEditViewProps> = ({
  nav,
  article: initial,
  routes,
}) => {
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
      const ref = await commitArticle({ article, file });
      const articleId = ref.id;
      routes.article(articleId);
    }, [file, article, commitArticle, routes])
  );

  const bottling = useBottling(article);

  const handleBottlingChange = useMemo(() => {
    return debounce(setBottling, 2500);
  }, [setBottling]);

  const previewArticle = useMemo(() => {
    const scoreArticle = {
      ...article,
      photoURL,
    };

    const previewScore = getPreviewScore(scoreArticle);

    return {
      ...scoreArticle,
      displayName:
        article.displayName && article.displayName.length > 0
          ? article.displayName
          : "Display name",
      ratingAggregate: {
        count: 1,
        sum: previewScore,
      },
    };
  }, [article, photoURL]);

  const canSave = isArticleValid(article) && !handleSave.busy;

  const classes = useStyles({ busy: handleSave.busy });

  return (
    <BurgerLayout>
      {null}
      <ViewBody>
        <ThemeProvider theme="dusk">
          <ViewCap>
            {nav}
            <ViewTitle title="Add drink" />
          </ViewCap>
        </ThemeProvider>
        <form className={classes.form}>
          <div className="content">
            <div className="fields">
              <Input
                type="text"
                placeholder="Display name"
                value={article.displayName || ""}
                onChange={setDisplayName}
              />
            </div>

            <div className="photo" onClick={clearPhoto}>
              <PhotoInput photoURL={photoURL} onFile={handleFile} />
            </div>

            <BottlingUserInput
              bottling={bottling}
              onChange={handleBottlingChange}
            />
          </div>
        </form>
      </ViewBody>
      <ViewCap>
        <div className={classes.preview}>
          <PreviewArticleItem article={previewArticle} />
        </div>
        <ButtonField>
          <MainButton
            disabled={!canSave}
            busy={handleSave.busy}
            onClick={handleSave.callback}
          >
            Add now
          </MainButton>
        </ButtonField>
      </ViewCap>
    </BurgerLayout>
  );
};

export default ArticleEditView;
