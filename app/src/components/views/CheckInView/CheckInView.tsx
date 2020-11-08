import React, { useState } from "react";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Article } from "types/types";
import ActionButton from "components/ui/trigger/ActionButton";

const RATINGS = [1, 2, 3, 4, 5];

interface CheckInViewProps {
  nav: React.ReactNode;
  article: Article;
}

const CheckInView: React.FC<CheckInViewProps> = ({ nav, article }) => {
  const data = article.data;

  const [rating, setRating] = useState<number>();

  return (
    <HeaderLayout>
      <ViewCap top>
        {nav}
        <ViewTitle title="Check In" />
      </ViewCap>
      <ViewBody>
        <h1>{data.displayName}</h1>
        <h3>
          by <b>{data.manufacturer}</b>
        </h3>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {RATINGS.map((r) => (
            <ActionButton
              key={r}
              variant={rating === r ? "safe" : "detail"}
              onClick={() => setRating(r)}
            >
              {r.toFixed(0)}
            </ActionButton>
          ))}
        </div>
        <ActionButton variant="safe">Check in now</ActionButton>
      </ViewBody>
    </HeaderLayout>
  );
};

export default CheckInView;
