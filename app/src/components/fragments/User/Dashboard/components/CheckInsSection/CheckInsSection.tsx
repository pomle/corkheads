import React, { useMemo } from "react";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";
import CheckInList from "components/fragments/CheckIn/CheckInList";

interface CheckInsSectionProps {
  userId: string;
}

const CheckInsSection: React.FC<CheckInsSectionProps> = ({ userId }) => {
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

  return <CheckInList pointers={request.results} />;
};

export default CheckInsSection;
