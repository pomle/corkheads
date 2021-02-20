import React, { useMemo } from "react";
import { Nav } from "components/ui/layout/NavigationBar";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import { useScrollSize } from "components/hooks/useScrollSize";
import ViewportDetector from "components/ui/trigger/ViewportDetector";
import ItemList from "components/ui/layout/ItemList";
import ContributionArticleItem from "components/fragments/Article/ContributionArticleItem";
import {
  ArticleQuery,
  useArticleQuery,
} from "components/hooks/db/useArticleQuery";
import HeaderPageLayout from "components/ui/layout/HeaderPageLayout";

const MIN_ITEMS = 20;
const MAX_ITEMS = 100;
const INC_SIZE = 10;

interface UserContributionsViewProps {
  nav: Nav;
  routes: {
    article: (articleId: string) => void;
  };
  userId: string;
}

const UserContributionsView: React.FC<UserContributionsViewProps> = ({
  nav,
  routes,
  userId,
}) => {
  const [size, bump] = useScrollSize(MIN_ITEMS, MAX_ITEMS, INC_SIZE);

  const query = useMemo((): ArticleQuery => {
    return {
      filters: {
        creatorUserIds: [userId],
      },
      limit: 100,
    };
  }, [userId]);

  const request = useArticleQuery(query);

  const pointers = useMemo(() => {
    return request.results.map((p) => {
      return {
        ...p,
        userId,
      };
    });
  }, [request, userId]);

  return (
    <ThemeProvider theme="pure">
      <HeaderPageLayout nav={nav} title="Contributions">
        <ItemList>
          {pointers.slice(0, size).map((pointer) => {
            return (
              <button
                key={pointer.articleId}
                onClick={() => routes.article(pointer.articleId)}
              >
                <ContributionArticleItem pointer={pointer} />
              </button>
            );
          })}
        </ItemList>
        <ViewportDetector onEnter={bump} />
      </HeaderPageLayout>
    </ThemeProvider>
  );
};

export default UserContributionsView;
