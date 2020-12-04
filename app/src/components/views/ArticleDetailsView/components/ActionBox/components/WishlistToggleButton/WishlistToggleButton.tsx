import React, { useCallback } from "react";
import ToggleButton from "components/ui/trigger/ToggleButton";
import { useUserWishlistArticle } from "components/hooks/db/useUserWishlistArticles";

interface WishlistToggleButtonProps {
  userId: string;
  articleId: string;
}

const WishlistToggleButton: React.FC<WishlistToggleButtonProps> = ({
  userId,
  articleId,
}) => {
  const entry = useUserWishlistArticle(userId, articleId);

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

  const onWishlist = entry?.data?.active;

  return (
    <ToggleButton toggled={onWishlist} onClick={() => setActive(!onWishlist)}>
      {onWishlist ? <>On wishlist</> : <>Add to wish list</>}
    </ToggleButton>
  );
};

export default WishlistToggleButton;
