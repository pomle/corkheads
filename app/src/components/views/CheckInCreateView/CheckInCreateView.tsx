import React, { useCallback, useMemo, useState } from "react";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { User } from "types/user";
import { Article } from "types/article";
import { CheckIn } from "types/checkIn";
import ActionButton from "components/ui/trigger/ActionButton";
import { makeStyles } from "@material-ui/styles";
import RatingInput from "./component/RatingInput";
import Section from "components/ui/layout/Section";
import SectionList from "components/ui/layout/SectionList";
import { useCommitCheckIn } from "./hooks";
import ImageSelect from "components/ui/trigger/ImageSelect";

const useStyles = makeStyles({
  content: {
    background: "#fff",
    color: "#5a5a5a",
    display: "flex",
    flexFlow: "column",
    height: "100vw",
    maxHeight: "400px",
    padding: "24px",
    justifyContent: "space-between",
    textAlign: "center",
  },
  meta: {
    lineHeight: 1.4,
    marginTop: "20%",
  },
  displayName: {
    fontSize: "20px",
    fontWeight: 700,
  },
  manufacturer: {
    fontSize: "16px",
    fontWeight: 500,
  },
  rating: {
    "& button": {
      fontSize: "40px",
    },
    margin: "0 10% 20% 10%",
  },
  photo: {
    background: "#c9c9c9",
    height: "100vw",
    maxHeight: "400px",
    overflow: "hidden",
    "& > img": {
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      width: "100%",
    },
  },
});

function isCheckInValid(checkIn: CheckIn) {
  const data = checkIn.data;
  return !!data.rating;
}

function createCheckIn(article: Article, user: User): CheckIn {
  return {
    id: "",
    data: {
      userId: user.uid,
      articleId: article.id,
    },
  };
}

interface CheckInCreateViewProps {
  nav: React.ReactNode;
  article: Article;
  user: User;
  onSuccess: () => void;
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

  const updateCheckIn = useCallback(
    (update: Partial<CheckIn["data"]>) => {
      setCheckIn((checkIn) => ({
        ...checkIn,
        data: {
          ...checkIn.data,
          ...update,
        },
      }));
    },
    [setCheckIn]
  );

  const setRating = useCallback(
    (rating: number) => {
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
    commitCheckIn({ user, checkIn, file }).then(() => {
      onSuccess();
    });
  }, [file, user, checkIn, commitCheckIn, onSuccess]);

  const canCheckIn = isCheckInValid(checkIn);

  const classes = useStyles();

  return (
    <HeaderLayout>
      <ViewCap top>
        {nav}
        <ViewTitle title="Check In" />
      </ViewCap>
      <ViewBody>
        <div className={classes.content}>
          <div className={classes.meta}>
            <div className={classes.displayName}>
              {article.data.displayName}
            </div>
            <div className={classes.manufacturer}>
              {article.data.manufacturer}
            </div>
          </div>

          <div className={classes.rating}>
            <RatingInput
              rating={checkIn.data.rating || 0}
              onChange={setRating}
            />
          </div>

          <ActionButton
            disabled={!canCheckIn}
            variant="action"
            onClick={handleCheckIn}
          >
            Check in now
          </ActionButton>
        </div>

        <SectionList>
          <Section header="Photo">
            <ImageSelect onFile={handleFile}>
              <div className={classes.photo}>
                {photoURL && <img src={photoURL} alt="Your picked upload" />}
              </div>
            </ImageSelect>
          </Section>
        </SectionList>

        <SectionList>
          <Section header="Comment">
            <textarea
              value={checkIn.data.comment || ""}
              onChange={(event) => setComment(event?.target.value)}
            />
          </Section>
        </SectionList>
      </ViewBody>
    </HeaderLayout>
  );
};

export default CheckInCreateView;
