import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import * as paths from "components/route/paths";
import { useCheckInStore } from "components/hooks/db/useCheckIns";
import { useArticleStore } from "components/hooks/db/useArticles";

interface CheckInProps {
  checkInId: string;
}

const CheckIn: React.FC<CheckInProps> = ({ checkInId }) => {
  const history = useHistory();

  const goToArticle = useCallback(
    (articleId: string) => {
      const url = paths.articleView.url({ articleId });
      history.push(url);
    },
    [history]
  );

  const checkInQuery = useMemo(() => [checkInId], [checkInId]);
  const checkInResult = useCheckInStore(checkInQuery);

  const checkIn = checkInResult.data[0];

  const articleQuery = useMemo(
    () => (checkIn ? [checkIn.data.articleId] : []),
    [checkIn]
  );

  const articleResult = useArticleStore(articleQuery);

  if (checkInResult.busy || articleResult.busy) {
    return null;
  }

  const article = articleResult.data[0];
  if (!article) {
    return null;
  }

  return (
    <tr>
      <td>{checkIn.id}</td>
      <td>
        <button type="button" onClick={() => goToArticle(article.id)}>
          {article.data.displayName}
        </button>
      </td>
    </tr>
  );
};

export default CheckIn;
