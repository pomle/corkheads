import React, { useCallback } from "react";
import ToggleButton from "components/ui/trigger/ToggleButton";
import { useUserArticle } from "components/hooks/db/useUserArticles";

interface CollectionToggleButtonProps {
  userId: string;
  articleId: string;
}

const CollectionToggleButton: React.FC<CollectionToggleButtonProps> = ({
  userId,
  articleId,
}) => {
  const entry = useUserArticle(userId, articleId);

  const setActive = useCallback(
    (active: boolean) => {
      if (!entry) {
        return;
      }
      entry.doc.set(
        {
          collection: { active },
        },
        { merge: true }
      );
    },
    [entry]
  );

  const inCollection = entry?.data?.collection?.active;

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
