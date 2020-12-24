import React, { useMemo } from "react";
import CheckInItem from "components/fragments/CheckIn/CheckInItem";
import ItemList from "components/ui/layout/ItemList";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";

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
      limit: 10,
    };
  }, []);

  const request = useCheckInQuery(query);

  return (
    <ItemList>
      {request.results.map(({ checkInEntry, articleEntry }) => {
        const article = articleEntry.data;
        const checkIn = checkInEntry.data;

        return (
          <button
            key={checkInEntry.id}
            onClick={() => routes.checkIn(checkInEntry.id)}
          >
            {article && checkIn && (
              <CheckInItem checkIn={checkIn} article={article} />
            )}
          </button>
        );
      })}
    </ItemList>
  );
};

export default CheckInSection;
