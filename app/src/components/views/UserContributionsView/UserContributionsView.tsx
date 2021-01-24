import React, { useMemo } from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { makeStyles } from "@material-ui/styles";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import { Theme } from "components/ui/theme/themes";
import ViewTitle from "components/ui/layout/ViewTitle";
import { useScrollSize } from "components/hooks/useScrollSize";
import ViewportDetector from "components/ui/trigger/ViewportDetector";
import ItemList from "components/ui/layout/ItemList";
import ArticleItem from "components/fragments/Article/ArticleItem";
import {
  ArticleQuery,
  useArticleQuery,
} from "components/hooks/db/useArticleQuery";

const useStyles = makeStyles((theme: Theme) => ({
  body: {
    margin: "24px",
  },
}));

const MIN_ITEMS = 20;
const MAX_ITEMS = 100;
const INC_SIZE = 10;

interface UserContributionsViewProps {
  nav: React.ReactNode;
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

  const classes = useStyles();

  return (
    <ThemeProvider theme="pure">
      <HeaderLayout>
        <ViewCap>
          {nav}
          <ViewTitle title="Contributions" />
        </ViewCap>
        <ViewBody>
          <div className={classes.body}>
            <ItemList>
              {pointers.slice(0, size).map((pointer) => {
                return (
                  <button
                    key={pointer.articleId}
                    onClick={() => routes.article(pointer.articleId)}
                  >
                    <ArticleItem pointer={pointer} />
                  </button>
                );
              })}
            </ItemList>
            <ViewportDetector onEnter={bump} />
          </div>
        </ViewBody>
      </HeaderLayout>
    </ThemeProvider>
  );
};

export default UserContributionsView;
