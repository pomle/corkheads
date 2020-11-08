import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Article } from "types/types";
import ItemListGroup from "components/ui/layout/ItemListGroup";
import * as Trans from "./locales";
import ItemListItem from "components/ui/layout/ItemListItem";
import ActionButton from "components/ui/trigger/ActionButton";
import * as paths from "components/route/paths";

interface ArticleDetailsViewProps {
  nav: React.ReactNode;
  article: Article;
}

const ArticleDetailsView: React.FC<ArticleDetailsViewProps> = ({
  nav,
  article,
}) => {
  const history = useHistory();
  const goToCheckIn = useCallback(() => {
    const url = paths.articleCheckIn.url({ articleId: article.id });
    history.push(url);
  }, [article.id, history]);

  const data = article.data;

  return (
    <HeaderLayout>
      <ViewCap top>
        {nav}
        <ViewTitle title={data.displayName} />
      </ViewCap>
      <ViewBody>
        <ItemListGroup title={<Trans.Source />}>
          <ItemListItem>
            <table>
              <tbody>
                <tr>
                  <th>
                    <Trans.Manufacturer />
                  </th>
                  <td>{data.manufacturer}</td>
                </tr>
              </tbody>
            </table>

            <ActionButton variant="safe" onClick={goToCheckIn}>
              Check in
            </ActionButton>
          </ItemListItem>
        </ItemListGroup>
      </ViewBody>
    </HeaderLayout>
  );
};

export default ArticleDetailsView;
