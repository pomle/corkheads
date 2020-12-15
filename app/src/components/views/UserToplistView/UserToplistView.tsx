import React from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { makeStyles } from "@material-ui/styles";
import Themer from "components/ui/theme/Themer";
import { Theme } from "components/ui/theme/themes";
import ViewHead from "components/ui/layout/ViewHead";
import ItemList from "components/ui/layout/ItemList";
import { useUserArticleToplistQuery } from "components/hooks/db/useUserArticleToplistQuery";
import { useContentCache } from "components/hooks/useContentCache";
import UserToplistViewItem from "./components/UserToplistViewItem";

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    textAlign: "center",
  },
  body: {
    margin: "0 16px",
  },
}));

const Item = React.memo(UserToplistViewItem);

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
  const request = useUserArticleToplistQuery(userId, 10);

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
            {useContentCache(() => {
              if (request.busy) {
                return;
              }

              return (
                <ItemList>
                  {request.results.map(
                    ({ articleEntry, userArticleEntry }, index) => {
                      return (
                        <Item
                          rank={index + 1}
                          article={articleEntry.data}
                          userArticle={userArticleEntry.data}
                          routes={routes}
                        />
                      );
                    }
                  )}
                </ItemList>
              );
            }, [request])}
          </div>
        </ViewBody>
      </HeaderLayout>
    </Themer>
  );
};

export default UserToplistView;
