import React from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { makeStyles } from "@material-ui/styles";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import { Theme } from "components/ui/theme/themes";
import ViewHead from "components/ui/layout/ViewHead";
import ItemList from "components/ui/layout/ItemList";
import { useUserArticleToplistQuery } from "components/hooks/db/useUserArticleToplistQuery";
import RankedTopArticleItem from "components/fragments/Article/RankedTopArticleItem";

const useStyles = makeStyles((theme: Theme) => ({
  body: {
    margin: "16px",
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
  const request = useUserArticleToplistQuery(userId, 10);

  const classes = useStyles();

  return (
    <ThemeProvider theme="pure">
      <HeaderLayout>
        <ViewCap>
          {nav}
          <ViewHead>
            <h1>Top drinks</h1>
          </ViewHead>
        </ViewCap>
        <ViewBody>
          <div className={classes.body}>
            <ItemList>
              {request.results.map((pointer, index) => {
                return (
                  <RankedTopArticleItem
                    rank={index + 1}
                    pointer={pointer}
                    routes={routes}
                  />
                );
              })}
            </ItemList>
          </div>
        </ViewBody>
      </HeaderLayout>
    </ThemeProvider>
  );
};

export default UserToplistView;
