import React from "react";
import CheckInItem from "components/fragments/CheckIn/CheckInItem";
import { CheckInPointer } from "components/hooks/db/useCheckInQuery";

interface CheckInItemButtonProps {
  pointer: CheckInPointer;
  route: (checkInId: string) => void;
}

const CheckInItemButton: React.FC<CheckInItemButtonProps> = React.memo(
  ({ pointer, route }) => {
    return (
      <button onClick={() => route(pointer.checkInId)}>
        <CheckInItem pointer={pointer} />
      </button>
    );
  }
);

export default CheckInItemButton;
