import React, { useMemo } from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { makeStyles } from "@material-ui/styles";
import Themer from "components/ui/theme/Themer";
import { Theme } from "components/ui/theme/themes";
import ViewHead from "components/ui/layout/ViewHead";
import ItemList from "components/ui/layout/ItemList";
import {
  UserArticleQuery,
  useUserArticleQuery,
} from "components/hooks/db/useUserArticleQuery";
import TopArticleItem from "components/fragments/Article/TopArticleItem";

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    textAlign: "center",
  },
  body: {
    margin: "0 16px",
  },
}));

interface UserToplistViewProps {
  nav: React.ReactNode;
  routes: {
    article: (articleId: string) => void;
  };
  userId: string;
}

const UserToplistView: React.FC<UserToplistViewProps> = ({
  nav,
  routes,
  userId,
}) => {
  const query = useMemo((): UserArticleQuery => {
    return {
      filters: {
        userId,
      },
      order: [
        {
          field: "checkIns",
          dir: "desc",
        },
      ],
      limit: 10,
    };
  }, [userId]);

  const result = useUserArticleQuery(query);

  const classes = useStyles();

  return (
    <Themer theme="cream">
      <HeaderLayout>
        <ViewCap>
          {nav}
          <ViewHead>
            <div className={classes.head}>
              <h1>Top drinks</h1>
            </div>
          </ViewHead>
        </ViewCap>
        <ViewBody>
          <div className={classes.body}>
            <ItemList>
              {result &&
                result.map(({ articleEntry, userArticleEntry }) => {
                  const article = articleEntry.data;
                  const userArticle = userArticleEntry.data;

                  return (
                    <button
                      key={articleEntry.id}
                      onClick={() => routes.article(articleEntry.id)}
                    >
                      {article && userArticle && (
                        <TopArticleItem
                          article={article}
                          userArticle={userArticle}
                        />
                      )}
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

export default UserToplistView;
