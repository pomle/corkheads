import React from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { makeStyles } from "@material-ui/styles";
import Themer from "components/ui/theme/Themer";
import { Theme } from "components/ui/theme/themes";
import ViewHead from "components/ui/layout/ViewHead";
import ItemList from "components/ui/layout/ItemList";
import TopArticleItem from "components/fragments/Article/TopArticleItem";
import { useUserArticleToplistQuery } from "components/hooks/db/useUserArticleToplistQuery";

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    textAlign: "center",
  },
  body: {
    margin: "0 16px",
  },
  item: {
    alignItems: "center",
    display: "flex",
    "& .rank": {
      color: theme.color.accent + "80",
      fontFamily: "Bree Serif",
      fontSize: "24px",
      paddingRight: "16px",
    },
    "& > :last-child": {
      flex: 1,
    },
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
  const result = useUserArticleToplistQuery(userId, 10);

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
                result.map(({ articleEntry, userArticleEntry }, index) => {
                  const article = articleEntry.data;
                  const userArticle = userArticleEntry.data;

                  return (
                    <button
                      key={articleEntry.id}
                      className={classes.item}
                      onClick={() => routes.article(articleEntry.id)}
                    >
                      <div className="rank">{index + 1}</div>
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
