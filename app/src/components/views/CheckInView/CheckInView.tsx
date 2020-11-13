import React, { useCallback, useMemo, useState } from "react";
import * as firebase from "firebase/app";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Article, CheckIn, User } from "types/types";
import ActionButton from "components/ui/trigger/ActionButton";
import { useGeolocation } from "components/hooks/useGeolocation";
import { useDB } from "components/hooks/useDB";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import RatingInput from "./component/RatingInput";
import Section from "components/ui/layout/Section";
import SectionList from "components/ui/layout/SectionList";

const useStyles = makeStyles({
  photo: {
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
});

interface CheckInViewProps {
  nav: React.ReactNode;
  article: Article;
  user: User;
  onSuccess: () => void;
}

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

const CheckInView: React.FC<CheckInViewProps> = ({
  nav,
  article,
  user,
  onSuccess,
}) => {
  const initial = useMemo(() => createCheckIn(article, user), [article, user]);
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

  const db = useDB();

  const commitCheckIn = useCallback(() => {
    db.collection("check-ins")
      .add(checkIn.data)
      .then((result) => {
        const increment = firebase.firestore.FieldValue.increment(1);

        const checkInRef = db
          .collection("users")
          .doc(user.uid)
          .collection("check-ins")
          .doc(result.id);

        const articleRef = db
          .collection("users")
          .doc(user.uid)
          .collection("articles")
          .doc(checkIn.data.articleId);

        const batch = db.batch();

        batch.set(checkInRef, {
          createdAt: moment().toISOString(),
        });

        batch.set(
          articleRef,
          {
            checkIns: increment,
          },
          { merge: true }
        );

        return batch.commit();
      })
      .then(() => {
        onSuccess();
      });
  }, [user.uid, checkIn, db, onSuccess]);


  const canCheckIn = isCheckInValid(checkIn);

  const classes = useStyles();

  return (
    <HeaderLayout>
      <ViewCap top>
        {nav}
        <ViewTitle title="Check In" />
      </ViewCap>
      <ViewBody>
        <div className={classes.photo}>
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
              onClick={commitCheckIn}
            >
              Check in now
            </ActionButton>
          </div>
        </div>

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

export default CheckInView;
