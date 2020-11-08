import React from "react";
import { makeStyles } from "@material-ui/styles";
import CheckBox from "components/ui/trigger/CheckBox";
import BlockPrefixedItem from "../BlockPrefixedItem";

const useStyles = makeStyles({
  toggle: {
    margin: "-16px",
    padding: "16px",
  },
});

interface CheckableItemProps {
  toggled: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

const CheckableItem: React.FC<CheckableItemProps> = ({
  toggled,
  disabled,
  onToggle,
  children,
}) => {
  const classes = useStyles();

  const Checkbox = (
    <button
      type="button"
      disabled={disabled}
      className={classes.toggle}
      onClick={onToggle}
    >
      <CheckBox checked={toggled} disabled={disabled} />
    </button>
  );

  return <BlockPrefixedItem prefix={Checkbox}>{children}</BlockPrefixedItem>;
};

export default CheckableItem;
