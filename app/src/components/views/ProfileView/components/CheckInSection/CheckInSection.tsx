import React, { useMemo } from "react";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";
import CheckInList from "components/fragments/CheckIn/CheckInList";

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
      limit: 5,
    };
  }, []);

  const request = useCheckInQuery(query);

  return <CheckInList pointers={request.results} routes={routes} />;
};

export default CheckInSection;
