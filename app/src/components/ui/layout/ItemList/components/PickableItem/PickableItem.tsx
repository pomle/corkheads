import React from "react";
import ItemListItem from "components/ui/layout/ItemListItem/ItemListItem";
import GoInto from "components/ui/trigger/GoInto";

interface PickableItemProps<T> {
  value: T;
  onPick: (value: T) => void;
}

const PickableItem: React.FC<PickableItemProps<any>> = ({
  value,
  onPick,
  children,
}) => {
  return (
    <ItemListItem onClick={() => onPick(value)}>
      <GoInto>{children}</GoInto>
    </ItemListItem>
  );
};

export default PickableItem;
