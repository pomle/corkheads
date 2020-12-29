import React from "react";
import ItemList from "components/ui/layout/ItemList";
import CheckInItemButton from "components/fragments/CheckIn/CheckInItem/Button";

interface CheckInListProps {
  pointers: { articleId: string; userId: string; checkInId: string }[];
  routes: {
    checkIn: (checkInId: string) => void;
  };
}

const CheckInList: React.FC<CheckInListProps> = ({ pointers, routes }) => {
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
};

export default CheckInList;
