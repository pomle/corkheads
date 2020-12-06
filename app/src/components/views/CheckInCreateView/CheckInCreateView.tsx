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
import Themer from "components/ui/theme/Themer";
import { Colors } from "components/ui/theme/themes";
import Divider from "components/ui/layout/Divider";
import Input from "components/ui/input/Input/Input";
import BurgerLayout from "components/ui/layout/BurgerLayout";
import ButtonField from "components/ui/layout/ButtonField";
import PhotoInput from "./component/PhotoInput";
import MainButton from "components/ui/trigger/MainButton/MainButton";

const useStyles = makeStyles({
  head: {
    textAlign: "center",
  },
  content: {
    background: Colors.BlueSmoke,
    borderRadius: "8px",
    color: "#5a5a5a",
    display: "grid",
    gridAutoFlow: "row",
    gridGap: "24px",
    margin: "28px",
    padding: "24px",
    textAlign: "center",
  },
  rating: {
    margin: "0 auto",
    width: "75%",
  },
  photo: {},
});

function isCheckInValid(checkIn: CheckIn) {
  return checkIn.rating.score !== undefined;
}

function createCheckIn(article: Article, user: User): CheckIn {
  return {
    id: "",
    userId: user.uid,
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
  onSuccess: (checkInId: string) => void;
}

const CheckInCreateView: React.FC<CheckInCreateViewProps> = ({
  nav,
  article,
  user,
  onSuccess,
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

  const handleCheckIn = useCallback(() => {
    commitCheckIn({ user, checkIn, file }).then((ref) => {
      onSuccess(ref.id);
    });
  }, [file, user, checkIn, commitCheckIn, onSuccess]);

  const canCheckIn = isCheckInValid(checkIn);

  const classes = useStyles();

  return (
    <BurgerLayout>
      <Themer theme="dusk">
        <ViewCap>
          {nav}
          <ViewHead>
            <div className={classes.head}>
              <h1>{article.displayName}</h1>
            </div>
          </ViewHead>
        </ViewCap>
      </Themer>
      <ViewBody>
        <Themer theme="dusk">
          <div className={classes.content}>
            <div className={classes.rating}>
              <RatingInput rating={rating} onChange={setRating} />
            </div>

            <Divider />

            <div className={classes.photo}>
              <PhotoInput photoURL={photoURL} onFile={handleFile} />
            </div>

            <div>
              <Input
                type="text"
                placeholder="Enter comment"
                value={checkIn.comment || ""}
                onChange={setComment}
              />
            </div>
          </div>
        </Themer>
      </ViewBody>

      <ButtonField>
        <MainButton disabled={!canCheckIn} onClick={handleCheckIn}>
          Check in now
        </MainButton>
      </ButtonField>
    </BurgerLayout>
  );
};

export default CheckInCreateView;
