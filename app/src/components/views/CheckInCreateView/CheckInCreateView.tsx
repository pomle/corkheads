import React, { useCallback, useMemo, useState } from "react";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { User } from "types/user";
import { Article } from "types/article";
import { CheckIn } from "types/checkIn";
import ActionButton from "components/ui/trigger/ActionButton";
import { useGeolocation } from "components/hooks/useGeolocation";
import { makeStyles } from "@material-ui/styles";
import RatingInput from "./component/RatingInput";
import Section from "components/ui/layout/Section";
import SectionList from "components/ui/layout/SectionList";
import { useCommitCheckIn } from "./hooks";
import ImageSelect from "components/ui/trigger/ImageSelect";

const useStyles = makeStyles({
  main: {
    background: "#fff",
    color: "#5a5a5a",
    height: "100vw",
    maxHeight: "400px",
    padding: "24px",
    "& > .content": {
      display: "flex",
      flexFlow: "column",
      height: "100%",
      justifyContent: "space-between",
      textAlign: "center",
    },
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

function copyPosition(position: Position) {
  const coords = position.coords;
  return {
    coords: {
      accuracy: coords.accuracy,
      altitude: coords.altitude,
      altitudeAccuracy: coords.altitudeAccuracy,
      heading: coords.heading,
      latitude: coords.latitude,
      longitude: coords.longitude,
      speed: coords.speed,
    },
    timestamp: position.timestamp,
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

  const setPosition = useCallback(
    (position: Position | undefined) => {
      updateCheckIn({ position });
    },
    [updateCheckIn]
  );

  const setComment = useCallback(
    (comment: string) => {
      updateCheckIn({ comment });
    },
    [updateCheckIn]
  );

  const { position } = useGeolocation();

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
        <div className={classes.main}>
          <div className="content">
            <div>
              <h3>{article.data.displayName}</h3>
              <h5>{article.data.manufacturer}</h5>
            </div>

            <RatingInput
              rating={checkIn.data.rating || 0}
              onChange={setRating}
            />

            <ActionButton
              disabled={!canCheckIn}
              variant="action"
              onClick={handleCheckIn}
            >
              Check in now
            </ActionButton>
          </div>
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
          <Section header="Location">
            <ActionButton
              disabled={!position}
              variant="action"
              onClick={() =>
                setPosition(
                  checkIn.data.position
                    ? undefined
                    : position
                    ? copyPosition(position)
                    : undefined
                )
              }
            >
              {checkIn.data.position ? "Remove Location" : "Add Location"}
            </ActionButton>
          </Section>

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
