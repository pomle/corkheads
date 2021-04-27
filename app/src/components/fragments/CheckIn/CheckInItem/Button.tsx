import React from "react";
import CheckInItem from "components/fragments/CheckIn/CheckInItem";
import { CheckInPointer } from "components/hooks/db/useCheckInQuery";
import { useCheckInRoute } from "components/route/paths";

interface CheckInItemButtonProps {
  pointer: CheckInPointer;
  toCheckIn: ({ checkInId }: { checkInId: string }) => void;
}

const CheckInItemButton: React.FC<CheckInItemButtonProps> = React.memo(
  ({ pointer, toCheckIn }) => {
    return (
      <button onClick={() => toCheckIn({ checkInId: pointer.checkInId })}>
        <CheckInItem pointer={pointer} />
      </button>
    );
  }
);

export default CheckInItemButton;
