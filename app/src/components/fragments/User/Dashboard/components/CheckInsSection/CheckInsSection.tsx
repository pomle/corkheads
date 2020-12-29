import React, { useMemo } from "react";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";
import CheckInList from "components/fragments/CheckIn/CheckInList";

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

  return <CheckInList pointers={request.results} routes={routes} />;
};

export default CheckInsSection;
