import React, { useCallback } from "react";
import ToggleButton from "components/ui/trigger/ToggleButton";
import { useUserArticle } from "components/hooks/db/useUserArticles";

interface WishlistToggleButtonProps {
  userId: string;
  articleId: string;
}

const WishlistToggleButton: React.FC<WishlistToggleButtonProps> = ({
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
          wishlist: { active },
        },
        { merge: true }
      );
    },
    [entry]
  );

  const onWishlist = entry?.data?.wishlist?.active;

  return (
    <ToggleButton toggled={onWishlist} onClick={() => setActive(!onWishlist)}>
      {onWishlist ? <>On wishlist</> : <>Add to wish list</>}
    </ToggleButton>
  );
};

export default WishlistToggleButton;
