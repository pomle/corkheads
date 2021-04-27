import React from "react";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import ItemList from "components/ui/layout/ItemList";
import { useUserArticleToplistQuery } from "components/hooks/db/useUserArticleToplistQuery";
import RankedTopArticleItem from "components/fragments/Article/RankedTopArticleItem";
import HeaderPageLayout from "components/ui/layout/HeaderPageLayout";
import { useBack, useScreen } from "components/context/ScreenContext";
import BackButton from "components/ui/trigger/BackButton";
import { stringCodec } from "components/route/codecs";
import ArticleDetailsView from "../ArticleDetailsView";
import { SlideRight } from "components/ui/transitions/Slide";

interface UserToplistViewProps {
  userId: string;
}

const UserToplistView: React.FC<UserToplistViewProps> = ({ userId }) => {
  const goBack = useBack();

  const goToArticle = useScreen({
    path: (path) => path.append("/:articleId", { articleId: stringCodec }),
    render: ({ articleId }) => (
      <ArticleDetailsView userId={userId} articleId={articleId} />
    ),
    transition: SlideRight,
  });

  const request = useUserArticleToplistQuery(userId, 10);

  return (
    <ThemeProvider theme="pure">
      <HeaderPageLayout
        nav={{ back: <BackButton onClick={goBack} /> }}
        title="Top drinks"
      >
        <ItemList divided>
          {request.results.map((pointer, index) => {
            return (
              <RankedTopArticleItem
                key={pointer.articleId}
                rank={index + 1}
                pointer={pointer}
                toArticle={goToArticle}
              />
            );
          })}
        </ItemList>
      </HeaderPageLayout>
    </ThemeProvider>
  );
};

export default UserToplistView;
