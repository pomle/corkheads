import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import PopupDialog from "components/ui/layout/PopupDialog";
import PopupDialogBody from "components/ui/layout/PopupDialog/components/PopupDialogBody";
import PopupDialogButtonSet from "components/ui/layout/PopupDialog/components/PopupDialogButtonSet";
import ActionButton from "components/ui/trigger/ActionButton";
import { Article } from "types/Article";
import PreviewArticleItem from "../PreviewArticleItem";

const useStyles = makeStyles({
  ConfirmCreateArticleDialog: {
    display: "grid",
    gridGap: "16px",
  },
});

interface ConfirmCreateArticleDialogProps {
  article: Article;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmCreateArticleDialog: React.FC<ConfirmCreateArticleDialogProps> = ({
  article,
  onConfirm,
  onCancel,
}) => {
  const classes = useStyles();

  return (
    <PopupDialog>
      <PopupDialogBody>
        <div className={classes.ConfirmCreateArticleDialog}>
          <p>This will add this whisky to the Corkheads database.</p>

          <div className="preview">
            <PreviewArticleItem article={article} />
          </div>

          <p>
            Once added, other people will be able to search for it, add it to
            their collection, and check it in.
          </p>

          <p>You will be credited as contributor for this whisky.</p>
        </div>
      </PopupDialogBody>
      <PopupDialogButtonSet>
        <ActionButton variant="primary" onClick={onConfirm}>
          Yes, add it!
        </ActionButton>
        <ActionButton variant="secondary" onClick={onCancel}>
          No, it's not ready.
        </ActionButton>
      </PopupDialogButtonSet>
    </PopupDialog>
  );
};

export default ConfirmCreateArticleDialog;
