import React from "react";
import { Nav } from "components/ui/layout/NavigationBar";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import ItemList from "components/ui/layout/ItemList";
import { useUserArticleToplistQuery } from "components/hooks/db/useUserArticleToplistQuery";
import RankedTopArticleItem from "components/fragments/Article/RankedTopArticleItem";
import HeaderPageLayout from "components/ui/layout/HeaderPageLayout";

interface UserToplistViewProps {
  nav: Nav;
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

  return (
    <ThemeProvider theme="pure">
      <HeaderPageLayout nav={nav} title="Top drinks">
        <ItemList divided>
          {request.results.map((pointer, index) => {
            return (
              <RankedTopArticleItem
                key={pointer.articleId}
                rank={index + 1}
                pointer={pointer}
                routes={routes}
              />
            );
          })}
        </ItemList>
      </HeaderPageLayout>
    </ThemeProvider>
  );
};

export default UserToplistView;
