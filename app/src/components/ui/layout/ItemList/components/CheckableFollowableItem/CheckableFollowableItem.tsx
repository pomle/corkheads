import React from "react";
import { makeStyles } from "@material-ui/styles";
import GoInto from "components/ui/trigger/GoInto";
import CheckableItem from "../CheckableItem";

const useStyles = makeStyles({
  follow: {
    boxSizing: "content-box",
    display: "block",
    height: "100%",
    margin: "-10px -20px -10px 0",
    padding: "10px 20px 10px 0",
    width: "100%"
  }
});

interface CheckableFollowableItemProps {
  toggled: boolean;
  disabled?: boolean;
  onToggle: () => void;
  onFollow: () => void;
}

const CheckableFollowableItem: React.FC<CheckableFollowableItemProps> = ({
  toggled,
  disabled,
  onToggle,
  onFollow,
  children
}) => {
  const classes = useStyles();

  return (
    <CheckableItem disabled={disabled} toggled={toggled} onToggle={onToggle}>
      <button type="button" className={classes.follow} onClick={onFollow}>
        <GoInto>{children}</GoInto>
      </button>
    </CheckableItem>
  );
};

export default CheckableFollowableItem;
