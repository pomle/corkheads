import React, { useMemo } from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { makeStyles } from "@material-ui/styles";
import Themer from "components/ui/theme/Themer";
import { Theme } from "components/ui/theme/themes";
import ViewHead from "components/ui/layout/ViewHead";
import {
  UserWishlistArticleQuery,
  useUserWishlistArticleQuery,
} from "components/hooks/db/useUserWishlistArticleQuery";
import WishlistArticleItem from "components/fragments/Article/WishlistArticleItem";
import ItemList from "components/ui/layout/ItemList";
import { useScrollSize } from "components/hooks/useScrollSize";
import { byDisplayName } from "lib/sort/userArticleTuple";
import { useContentCache } from "components/hooks/useContentCache";
import ViewportDetector from "components/ui/trigger/ViewportDetector";

const useStyles = makeStyles((theme: Theme) => ({
  body: {
    margin: "24px",
  },
}));

const MAX_ITEMS = 100;

interface UserWishlistViewProps {
  nav: React.ReactNode;
  routes: {
    article: (articleId: string) => void;
  };
  userId: string;
}

const UserWishlistView: React.FC<UserWishlistViewProps> = ({
  nav,
  routes,
  userId,
}) => {
  const [size, bump] = useScrollSize(6, MAX_ITEMS, 6);

  const query = useMemo((): UserWishlistArticleQuery => {
    return {
      filters: {
        userId,
      },
      limit: MAX_ITEMS,
    };
  }, [userId]);

  const request = useUserWishlistArticleQuery(query);

  const items = useMemo(() => {
    return Array.from(request.results.values()).sort(byDisplayName);
  }, [request.results]);

  const classes = useStyles();

  return (
    <Themer theme="pure">
      <HeaderLayout>
        <ViewCap>
          {nav}
          <ViewHead>
            <h1>Wishlist</h1>
          </ViewHead>
        </ViewCap>
        <ViewBody>
          <div className={classes.body}>
            {useContentCache(() => {
              if (request.busy) {
                return;
              }

              return (
                <ItemList>
                  {items.slice(0, size).map(({ articleEntry }) => {
                    const article = articleEntry.data;

                    return (
                      <button
                        key={articleEntry.id}
                        onClick={() => routes.article(articleEntry.id)}
                      >
                        {article && <WishlistArticleItem article={article} />}
                      </button>
                    );
                  })}
                </ItemList>
              );
            }, [items, request])}
            <ViewportDetector onEnter={bump} />
          </div>
        </ViewBody>
      </HeaderLayout>
    </Themer>
  );
};

export default UserWishlistView;
