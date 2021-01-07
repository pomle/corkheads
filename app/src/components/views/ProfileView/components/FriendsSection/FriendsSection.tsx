import React, { useMemo } from "react";
import ItemList from "components/ui/layout/ItemList";
import UserItem from "components/fragments/User/UserItem";
import {
  FollowingQuery,
  useFollowingQuery,
} from "components/hooks/db/useFollowingQuery";

interface FriendsSectionProps {
  userId: string;
  routes: {
    user: (userId: string) => void;
  };
}

const FriendsSection: React.FC<FriendsSectionProps> = ({ userId, routes }) => {
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

  return (
    <ItemList divided>
      {request.results.map((pointer) => {
        return (
          <button
            key={pointer.userId}
            type="button"
            onClick={() => routes.user(pointer.userId)}
          >
            <UserItem pointer={pointer} />
          </button>
        );
      })}
    </ItemList>
  );
};

export default FriendsSection;
