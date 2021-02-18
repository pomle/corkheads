import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import PopupDialog from "components/ui/layout/PopupDialog";
import PopupDialogBody from "components/ui/layout/PopupDialog/components/PopupDialogBody";
import PopupDialogButtonSet from "components/ui/layout/PopupDialog/components/PopupDialogButtonSet";
import ActionButton from "components/ui/trigger/ActionButton";

const useStyles = makeStyles({
  OKDialog: {
    display: "grid",
    fontSize: "16px",
    fontWeight: 500,
    gridGap: "1em",
    textAlign: "center",
  },
});

interface OKDialogProps {
  onConfirm: () => void;
}

const OKDialog: React.FC<OKDialogProps> = ({ onConfirm, children }) => {
  const classes = useStyles();

  return (
    <PopupDialog>
      <PopupDialogBody>
        <div className={classes.OKDialog}>{children}</div>
      </PopupDialogBody>
      <PopupDialogButtonSet>
        <ActionButton variant="primary" onClick={onConfirm}>
          OK
        </ActionButton>
      </PopupDialogButtonSet>
    </PopupDialog>
  );
};

export default OKDialog;
