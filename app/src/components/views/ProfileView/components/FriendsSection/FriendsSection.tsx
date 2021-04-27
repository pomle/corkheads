import React, { useMemo } from "react";
import ItemList from "components/ui/layout/ItemList";
import UserItem from "components/fragments/User/UserItem";
import {
  FollowingQuery,
  useFollowingQuery,
} from "components/hooks/db/useFollowingQuery";
import { useUserRoute } from "components/route/paths";

interface FriendsSectionProps {
  userId: string;
}

const FriendsSection: React.FC<FriendsSectionProps> = ({ userId }) => {
  const query = useMemo((): FollowingQuery => {
    return {
      userId,
      order: [
        {
          field: "timestamp",
          dir: "desc",
        },
      ],
      limit: 5,
    };
  }, [userId]);

  const request = useFollowingQuery(query);

  const goToUser = useUserRoute();

  return (
    <ItemList divided>
      {request.results.map((pointer) => {
        return (
          <button
            key={pointer.userId}
            type="button"
            onClick={() => goToUser({ userId: pointer.userId })}
          >
            <UserItem pointer={pointer} />
          </button>
        );
      })}
    </ItemList>
  );
};

export default FriendsSection;
