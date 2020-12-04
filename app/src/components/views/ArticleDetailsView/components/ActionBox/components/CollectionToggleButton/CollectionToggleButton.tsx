import React, { useCallback } from "react";
import ToggleButton from "components/ui/trigger/ToggleButton";
import { useUserCollectionArticle } from "components/hooks/db/useUserCollectionArticles";

interface CollectionToggleButtonProps {
  userId: string;
  articleId: string;
}

const CollectionToggleButton: React.FC<CollectionToggleButtonProps> = ({
  userId,
  articleId,
}) => {
  const entry = useUserCollectionArticle(userId, articleId);

  const setActive = useCallback(
    (active: boolean) => {
      if (!entry) {
        return;
      }
      entry.doc.set(
        {
          active,
        },
        { merge: true }
      );
    },
    [entry]
  );

  const inCollection = entry?.data?.active;

  return (
    <ToggleButton
      toggled={inCollection}
      onClick={() => setActive(!inCollection)}
    >
      {inCollection ? <>In collection</> : <>Add to collection</>}
    </ToggleButton>
  );
};

export default CollectionToggleButton;
