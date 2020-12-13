import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
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
import * as paths from "components/route/paths";
import WishlistArticleItem from "components/fragments/Article/WishlistArticleItem";
import ItemList from "components/ui/layout/ItemList";

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    textAlign: "center",
  },
  body: {
    margin: "0 16px",
  },
}));

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
  const history = useHistory();

  const goToArticle = useCallback(
    (articleId: string) => {
      const url = paths.articleView.url({ articleId });
      history.push(url);
    },
    [history]
  );

  const query = useMemo((): UserWishlistArticleQuery => {
    return {
      filters: {
        userId,
      },
      order: [{ field: "addedTimestamp", dir: "desc" }],
      limit: 3,
    };
  }, [userId]);

  const request = useUserWishlistArticleQuery(query);

  const classes = useStyles();

  return (
    <Themer theme="cream">
      <HeaderLayout>
        <ViewCap>
          {nav}
          <ViewHead>
            <div className={classes.head}>
              <h1>Wishlist</h1>
            </div>
          </ViewHead>
        </ViewCap>
        <ViewBody>
          <div className={classes.body}>
            <ItemList>
              {request.results.map(({ articleEntry }) => {
                const article = articleEntry.data;

                return (
                  <button
                    key={articleEntry.id}
                    onClick={() => goToArticle(articleEntry.id)}
                  >
                    {article && <WishlistArticleItem article={article} />}
                  </button>
                );
              })}
            </ItemList>
          </div>
        </ViewBody>
      </HeaderLayout>
    </Themer>
  );
};

export default UserWishlistView;
