import React, { useCallback, useMemo, useState } from "react";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { User } from "types/User";
import { Article } from "types/Article";
import { CheckIn } from "types/CheckIn";
import { makeStyles } from "@material-ui/styles";
import RatingInput from "./component/RatingInput";
import { useCommitCheckIn } from "./hooks";
import { Rating } from "types/Rating";
import ViewHead from "components/ui/layout/ViewHead";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import Input from "components/ui/input/Input/Input";
import FooterLayout from "components/ui/layout/FooterLayout/FooterLayout";
import ButtonField from "components/ui/layout/ButtonField";
import PhotoInput from "./component/PhotoInput";
import MainButton from "components/ui/trigger/MainButton/MainButton";
import { useAsyncCallback } from "components/hooks/useAsyncCallback";
import { Theme, themes } from "components/ui/theme/themes";

type StyleProps = {
  busy: boolean;
  love: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    textAlign: "center",
  },
  body: {
    filter: (props: StyleProps) =>
      props.busy ? "grayscale(0.25) opacity(0.5)" : "none",
    pointerEvents: (props: StyleProps) => (props.busy ? "none" : "all"),
    transition: "filter 0.5s ease",
  },
  panel: {
    background: themes.dusk.color.surface,
    borderRadius: "4px",
    overflow: "hidden",
    margin: "24px",
  },
  rating: {
    margin: "24px",
  },
  photo: {
    background: themes.dusk.color.panel,
  },
  meta: {
    padding: "16px",
  },
}));

function isCheckInValid(checkIn: CheckIn) {
  return checkIn.rating.score !== undefined;
}

function createCheckIn(article: Article, user: User): CheckIn {
  return {
    id: "",
    userId: user.id,
    articleId: article.id,
    rating: {
      score: undefined,
      love: false,
    },
  };
}

interface CheckInCreateViewProps {
  nav: React.ReactNode;
  article: Article;
  user: User;
  routes: {
    checkIn: (checkInId: string) => void;
  };
}

const CheckInCreateView: React.FC<CheckInCreateViewProps> = ({
  nav,
  article,
  user,
  routes,
}) => {
  const initial = useMemo(() => createCheckIn(article, user), [article, user]);

  const [photoURL, setPhotoURL] = useState<string>();
  const [file, setFile] = useState<File>();

  const [checkIn, setCheckIn] = useState<CheckIn>(initial);
  const { rating } = checkIn;

  const updateCheckIn = useCallback(
    (update: Partial<CheckIn>) => {
      setCheckIn((checkIn) => ({
        ...checkIn,
        ...update,
      }));
    },
    [setCheckIn]
  );

  const setRating = useCallback(
    (rating: Rating) => {
      updateCheckIn({ rating });
    },
    [updateCheckIn]
  );

  const handleFile = useCallback((file: File) => {
    setFile(file);

    const url = URL.createObjectURL(file);
    setPhotoURL(url);
  }, []);

  const setComment = useCallback(
    (comment: string) => {
      updateCheckIn({ comment });
    },
    [updateCheckIn]
  );

  const commitCheckIn = useCommitCheckIn();

  const handleCheckIn = useAsyncCallback(
    useCallback(async () => {
      const ref = await commitCheckIn({ user, checkIn, file });
      routes.checkIn(ref.id);
    }, [file, user, checkIn, routes, commitCheckIn])
  );

  const canCheckIn = isCheckInValid(checkIn) && !handleCheckIn.busy;

  const classes = useStyles({ love: rating.love, busy: handleCheckIn.busy });

  return (
    <FooterLayout>
      <ViewBody>
        <ThemeProvider theme="dusk">
          <ViewCap>
            {nav}
            <ViewHead>
              <div className={classes.head}>
                <h1>{article.displayName}</h1>
              </div>
            </ViewHead>
          </ViewCap>
        </ThemeProvider>
        <div className={classes.body}>
          <div className={classes.rating}>
            <RatingInput rating={rating} onChange={setRating} />
          </div>

          <ThemeProvider theme="dusk">
            <div className={classes.panel}>
              <div className={classes.photo}>
                <PhotoInput photoURL={photoURL} onFile={handleFile} />
              </div>

              <div className={classes.meta}>
                <Input
                  type="text"
                  placeholder="Enter comment"
                  value={checkIn.comment || ""}
                  onChange={setComment}
                />
              </div>
            </div>
          </ThemeProvider>
        </div>
      </ViewBody>

      <ButtonField>
        <MainButton
          disabled={!canCheckIn}
          busy={handleCheckIn.busy}
          onClick={handleCheckIn.callback}
        >
          Check in now
        </MainButton>
      </ButtonField>
    </FooterLayout>
  );
};

export default CheckInCreateView;
