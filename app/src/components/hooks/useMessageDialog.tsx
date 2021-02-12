import React, { useCallback } from "react";
import { usePopupDialog } from "components/context/PopupDialogContext";
import OKDialog from "components/ui/layout/OKDialog";

export function useMessageDialog() {
  const { publish, clear } = usePopupDialog();

  const publishMessage = useCallback(
    (content: React.ReactNode) => {
      publish(<OKDialog onConfirm={clear}>{content}</OKDialog>);
    },
    [publish, clear]
  );

  return {
    publishMessage,
  };
}
