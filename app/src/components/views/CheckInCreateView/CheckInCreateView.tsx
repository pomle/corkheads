import React, { useCallback, useMemo, useState } from "react";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { User } from "types/User";
import { Article } from "types/Article";
import { CheckIn } from "types/CheckIn";
import ActionButton from "components/ui/trigger/ActionButton";
import { makeStyles } from "@material-ui/styles";
import RatingInput from "./component/RatingInput";
import Section from "components/ui/layout/Section";
import SectionList from "components/ui/layout/SectionList";
import { useCommitCheckIn } from "./hooks";
import ImageSelect from "components/ui/trigger/ImageSelect";
import Photo from "components/ui/layout/Photo";

const useStyles = makeStyles({
  "@keyframes beat": {
    "0%": {
      transform: "scale(1)",
    },
    "100%": {
      transform: "scale(1.5)",
    },
  },
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
    marginTop: "10%",
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
    "& button.loveIt": {
      filter: "grayscale(1) opacity(0.3)",
      fontSize: "60px",
      transition: "filter 0.2s ease",
      "&.active": {
        animation: `$beat 2000ms ease infinite alternate`,
        filter: "none",
      },
    },
    margin: "0 10% 20% 10%",
  },
  photo: {
    height: "100vw",
    maxHeight: "400px",
  },
});

function isCheckInValid(checkIn: CheckIn) {
  return !!checkIn.rating;
}

function createCheckIn(article: Article, user: User): CheckIn {
  return {
    id: "",
    userId: user.uid,
    articleId: article.id,
    loveIt: false,
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
    (update: Partial<CheckIn>) => {
      setCheckIn((checkIn) => ({
        ...checkIn,
        ...update,
      }));
    },
    [setCheckIn]
  );

  const setRating = useCallback(
    (rating: number) => {
      updateCheckIn({ rating });
      if (rating < 5) {
        updateCheckIn({ loveIt: false });
      }
    },
    [updateCheckIn]
  );

  const setLoveIt = useCallback(() => {
    updateCheckIn({ loveIt: true });
  }, [updateCheckIn]);

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

  const canLoveIt = checkIn.rating === 5;

  const { displayName, manufacturer } = article;
  const { rating, loveIt } = checkIn;

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
            <div className={classes.displayName}>{displayName}</div>
            <div className={classes.manufacturer}>{manufacturer}</div>
          </div>

          <div className={classes.rating}>
            <RatingInput rating={rating || 0} onChange={setRating} />
            {canLoveIt && (
              <button
                type="button"
                className={loveIt ? "loveIt active" : "loveIt"}
                onClick={setLoveIt}
              >
                💖
              </button>
            )}
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
                <Photo url={photoURL} />
              </div>
            </ImageSelect>
          </Section>
        </SectionList>

        <SectionList>
          <Section header="Comment">
            <textarea
              value={checkIn.comment || ""}
              onChange={(event) => setComment(event?.target.value)}
            />
          </Section>
        </SectionList>
      </ViewBody>
    </HeaderLayout>
  );
};

export default CheckInCreateView;
