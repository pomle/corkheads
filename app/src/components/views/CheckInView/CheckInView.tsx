import React, { useCallback, useMemo, useState } from "react";
import * as firebase from "firebase/app";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Article, CheckIn, User } from "types/types";
import ActionButton from "components/ui/trigger/ActionButton";
import ItemListGroup from "components/ui/layout/ItemListGroup";
import ItemListItem from "components/ui/layout/ItemListItem";
import { useGeolocation } from "components/hooks/useGeolocation";
import { useDB } from "components/hooks/useDB";
import moment from "moment";

const RATINGS = [1, 2, 3, 4, 5];

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

  const setComment = useCallback(
    (comment: string) => {
      updateCheckIn({ comment });
    },
    [updateCheckIn]
  );

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

  const { position } = useGeolocation();

  const canCheckIn = isCheckInValid(checkIn);

  return (
    <HeaderLayout>
      <ViewCap top>
        {nav}
        <ViewTitle title="Check In" />
      </ViewCap>
      <ViewBody>
        <div
          style={{ display: "flex", flexDirection: "column", padding: "16px" }}
        >
          <h1>{article.data.displayName}</h1>
          <h3>
            by <b>{article.data.manufacturer}</b>
          </h3>
          <ItemListGroup title="Rating">
            <ItemListItem>
              <div
                style={{
                  display: "flex",
                  fontSize: "24px",
                  justifyContent: "space-around",
                }}
              >
                {RATINGS.map((r) => (
                  <button
                    style={{
                      filter:
                        checkIn.data.rating && checkIn.data.rating >= r
                          ? "grayscale(0%)"
                          : "grayscale(100%)",
                    }}
                    key={r}
                    onClick={() => setRating(r)}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </ItemListItem>
          </ItemListGroup>

          <ItemListGroup title="Location">
            <ItemListItem>
              Position:
              {position && (
                <>
                  <div>Lat: {position?.coords.latitude}</div>
                  <div>Long: {position?.coords.longitude}</div>
                </>
              )}
            </ItemListItem>
          </ItemListGroup>

          <ItemListGroup title="Comment">
            <ItemListItem>
              <textarea
                value={checkIn.data.comment || ""}
                onChange={(event) => setComment(event?.target.value)}
              />
            </ItemListItem>
          </ItemListGroup>

          <ActionButton
            disabled={!canCheckIn}
            variant="safe"
            onClick={commitCheckIn}
          >
            Check in Now
          </ActionButton>
        </div>
      </ViewBody>
    </HeaderLayout>
  );
};

export default CheckInView;
