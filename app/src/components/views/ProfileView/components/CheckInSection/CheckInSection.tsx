import React, { useMemo } from "react";
import ItemList from "components/ui/layout/ItemList";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";
import CheckInItemButton from "components/fragments/CheckIn/CheckInItem/Button";

interface CheckInSectionProps {
  userId: string;
  routes: {
    checkIn: (checkInId: string) => void;
  };
}

const CheckInSection: React.FC<CheckInSectionProps> = ({ userId, routes }) => {
  const query = useMemo((): CheckInQuery => {
    return {
      order: [
        {
          field: "timestamp",
          dir: "desc",
        },
      ],
      limit: 8,
    };
  }, []);

  const request = useCheckInQuery(query);

  return (
    <ItemList divided>
      {request.results.map((pointer) => {
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

export default CheckInSection;
