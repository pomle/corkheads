import React from "react";
import { makeStyles } from "@material-ui/styles";
import ViewHead from "components/ui/layout/ViewHead";
import { ReactComponent as CancelIcon } from "assets/graphics/icons/cancel.svg";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },
  title: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  subtitle: {
    color: "#888",
    fontSize: 12,
    fontWeight: 400
  }
});

interface DialogTitleProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  onCancel: () => void;
}

const DialogTitle: React.FC<DialogTitleProps> = ({
  title,
  subtitle,
  onCancel
}) => {
  const classes = useStyles();

  return (
    <ViewHead>
      <div className={classes.root}>
        <div>
          <h3 className={classes.title}>{title}</h3>
          <div className={classes.subtitle}>{subtitle}</div>
        </div>

        <button type="button" onClick={onCancel}>
          <CancelIcon />
        </button>
      </div>
    </ViewHead>
  );
};

export default DialogTitle;
