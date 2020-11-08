import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  itemListItem: {
    alignItems: "center",
    display: "flex",
    minHeight: 50,
    opacity: (props: ItemListItemProps) => (props.disabled ? 0.2 : 1),
    padding: "10px 20px",
    pointerEvents: (props: ItemListItemProps) =>
      props.disabled ? "none" : "all",
  },
  content: {
    width: "100%",
  },
});

interface ItemListItemProps {
  onClick?: () => void;
  disabled?: boolean;
}

const ItemListItem: React.FC<ItemListItemProps> = ({
  onClick,
  disabled,
  children,
}) => {
  const classes = useStyles({ disabled });

  const content = (
    <div className={classes.itemListItem}>
      <div className={classes.content}>{children}</div>
    </div>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes.content}>
        {content}
      </button>
    );
  }

  return content;
};

export default ItemListItem;
