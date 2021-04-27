import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import UserItem from "../UserItem";
import FriendStateButton from "./components/FriendStateButton";
import { useFollowing } from "components/hooks/db/useFollowing";

const useStyles = makeStyles({
  SearchUserItem: {
    alignItems: "center",
    display: "flex",
    "& > *:first-child": {
      flex: "1",
    },
  },
  state: {
    flex: "0",
  },
});

interface SearchUserItemProps {
  pointer: { userId: string };
  toUser: ({ userId }: { userId: string }) => void;
  following: ReturnType<typeof useFollowing>;
}

const SearchUserItem: React.FC<SearchUserItemProps> = ({
  pointer,
  toUser,
  following: { add, remove, users },
}) => {
  const classes = useStyles();

  const { userId } = pointer;

  const isFollowing = users.has(pointer.userId);

  const handleToggleFollowing = useCallback(() => {
    if (isFollowing) {
      remove(userId);
    } else {
      add(userId);
    }
  }, [isFollowing, userId, add, remove]);

  return (
    <div className={classes.SearchUserItem}>
      <button onClick={() => toUser({ userId: pointer.userId })}>
        <UserItem pointer={pointer} />
      </button>
      <div className={classes.state}>
        <FriendStateButton
          isFollowing={isFollowing}
          onToggle={handleToggleFollowing}
        />
      </div>
    </div>
  );
};

export default SearchUserItem;
