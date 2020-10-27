import React from "react";
import { makeStyles } from "@material-ui/styles";
import CheckCircleIcon from "components/ui/icons/CheckCircleIcon";

type CheckedItemType = "safe" | "detail" | "disabled";

const useStyles = makeStyles({
  row: {
    display: "flex",
    justifyContent: "space-between"
  },
  check: {
    paddingTop: 5
  }
});

interface CheckedItemProps {
  variant: CheckedItemType;
}

const CheckedItem: React.FC<CheckedItemProps> = ({ children, variant }) => {
  const classes = useStyles();
  return (
    <div className={classes.row}>
      <div className={classes.check}>
        <CheckCircleIcon variant={variant} />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default CheckedItem;
