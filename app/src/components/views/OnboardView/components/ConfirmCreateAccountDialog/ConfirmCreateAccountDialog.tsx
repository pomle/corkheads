import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import PopupDialog from "components/ui/layout/PopupDialog";
import PopupDialogBody from "components/ui/layout/PopupDialog/components/PopupDialogBody";
import PopupDialogButtonSet from "components/ui/layout/PopupDialog/components/PopupDialogButtonSet";
import ActionButton from "components/ui/trigger/ActionButton";

const useStyles = makeStyles({
  ConfirmCreateAccountDialog: {
    fontSize: "16px",
    fontWeight: 500,
    textAlign: "center",
    wordBreak: "break-word",
    "& > .email": {
      margin: "0.8em 0",
    },
  },
});

interface ConfirmCreateAccountDialogProps {
  email: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmCreateAccountDialog: React.FC<ConfirmCreateAccountDialogProps> = ({
  email,
  onConfirm,
  onCancel,
}) => {
  const classes = useStyles();

  return (
    <PopupDialog>
      <PopupDialogBody>
        <div className={classes.ConfirmCreateAccountDialog}>
          You will now create an account with email
          <div className="email">
            <b>{email}</b>
          </div>
          Is this correct?
        </div>
      </PopupDialogBody>
      <PopupDialogButtonSet>
        <ActionButton variant="primary" onClick={onConfirm}>
          Yes, create!
        </ActionButton>
        <ActionButton variant="secondary" onClick={onCancel}>
          Cancel
        </ActionButton>
      </PopupDialogButtonSet>
    </PopupDialog>
  );
};

export default ConfirmCreateAccountDialog;
