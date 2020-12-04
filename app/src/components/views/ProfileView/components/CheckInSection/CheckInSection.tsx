import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import CheckInItem from "components/fragments/CheckIn/CheckInItem";
import ItemList from "components/ui/layout/ItemList";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";
import * as paths from "components/route/paths";

interface CheckInSectionProps {
  userId: string;
}

const CheckInSection: React.FC<CheckInSectionProps> = ({ userId }) => {
  const history = useHistory();

  const goToCheckIn = useCallback(
    (checkInId: string) => {
      const url = paths.checkInView.url({ checkInId });
      history.push(url);
    },
    [history]
  );

  const checkInHistoryQuery = useMemo((): CheckInQuery => {
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

  const checkInHistoryResult = useCheckInQuery(checkInHistoryQuery);

  return (
    <ItemList>
      {checkInHistoryResult &&
        checkInHistoryResult.map(({ checkInEntry, articleEntry }) => {
          const article = articleEntry.data;
          const checkIn = checkInEntry.data;

          return (
            <button
              key={checkInEntry.id}
              onClick={() => goToCheckIn(checkInEntry.id)}
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
