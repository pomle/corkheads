import React, { useMemo } from "react";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";
import CheckInList from "components/fragments/CheckIn/CheckInList";

interface CheckInSectionProps {
  toCheckIn: ({ checkInId }: { checkInId: string }) => void;
}

const CheckInSection: React.FC<CheckInSectionProps> = ({ toCheckIn }) => {
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

  return <CheckInList pointers={request.results} toCheckIn={toCheckIn} />;
};

export default CheckInSection;
