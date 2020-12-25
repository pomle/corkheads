import React, { useMemo } from "react";
import ItemList from "components/ui/layout/ItemList";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";
import CheckInItemButton from "components/fragments/CheckIn/CheckInItem/Button";

interface CheckInsSectionProps {
  userId: string;
  routes: {
    checkIn: (checkInId: string) => void;
  };
}

const CheckInsSection: React.FC<CheckInsSectionProps> = ({
  userId,
  routes,
}) => {
  const query = useMemo((): CheckInQuery => {
    return {
      filters: {
        userIds: [userId],
      },
      order: [
        {
          field: "timestamp",
          dir: "desc",
        },
      ],
      limit: 3,
    };
  }, [userId]);

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

export default CheckInsSection;
