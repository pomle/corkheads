import React from "react";
import StateButton from "components/ui/trigger/StateButton";
import { ReactComponent as CheckIcon } from "assets/graphics/icons/check.svg";
import { ReactComponent as PlusIcon } from "assets/graphics/icons/plus.svg";

interface FriendStateButtonProps {
  isFollowing: boolean;
  onToggle: () => void;
}

const FriendStateButton: React.FC<FriendStateButtonProps> = ({
  isFollowing,
  onToggle,
}) => {
  return (
    <StateButton state={isFollowing ? "on" : "off"} onClick={onToggle}>
      {isFollowing ? (
        <>
          <CheckIcon /> Following
        </>
      ) : (
        <>
          <PlusIcon /> Follow
        </>
      )}
    </StateButton>
  );
};

export default FriendStateButton;
