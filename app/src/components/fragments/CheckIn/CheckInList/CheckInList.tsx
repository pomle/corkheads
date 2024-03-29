import React from "react";
import ItemList from "components/ui/layout/ItemList";
import CheckInItemButton from "components/fragments/CheckIn/CheckInItem/Button";
import ArticleContextCheckInItemButton from "components/fragments/CheckIn/ArticleContextCheckInItem/Button";

type CheckInContext = "general" | "article";

interface CheckInListProps {
  pointers: { articleId: string; userId: string; checkInId: string }[];
  routes: {
    checkIn: (checkInId: string) => void;
  };
  context?: CheckInContext;
}

const CheckInList: React.FC<CheckInListProps> = ({
  pointers,
  routes,
  context = "general",
}) => {
  if (context === "article") {
    return (
      <ItemList divided>
        {pointers.map((pointer) => {
          return (
            <ArticleContextCheckInItemButton
              key={pointer.checkInId}
              pointer={pointer}
              route={routes.checkIn}
            />
          );
        })}
      </ItemList>
    );
  } else {
    return (
      <ItemList divided>
        {pointers.map((pointer) => {
          return (
            <CheckInItemButton
              key={pointer.checkInId}
              pointer={pointer}
              route={routes.checkIn}
            />
          );
        })}
      </ItemList>
    );
  }
};

export default CheckInList;
