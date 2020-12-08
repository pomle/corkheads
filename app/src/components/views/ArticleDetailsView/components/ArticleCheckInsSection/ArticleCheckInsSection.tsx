import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";
import ItemList from "components/ui/layout/ItemList";
import CheckInItem from "./components/CheckInItem";
import SectionList from "components/ui/layout/SectionList/SectionList";
import Section from "components/ui/layout/Section";
import SectionTitle from "components/ui/layout/SectionTitle";
import * as paths from "components/route/paths";

interface ArticleCheckInsSectionProps {
  articleId: string;
}

const ArticleCheckInsSection: React.FC<ArticleCheckInsSectionProps> = ({
  articleId,
}) => {
  const history = useHistory();

  const goToCheckIn = useCallback(
    (checkInId: string) => {
      const url = paths.checkInView.url({ checkInId });
      history.push(url);
    },
    [history]
  );

  const query = useMemo((): CheckInQuery => {
    return {
      filters: {
        articleIds: [articleId],
      },
      order: [
        {
          field: "timestamp",
          dir: "desc",
        },
      ],
      limit: 10,
    };
  }, [articleId]);

  const result = useCheckInQuery(query);

  return (
    <SectionList>
      <Section header={<SectionTitle main="Recent Check ins" />}>
        <ItemList>
          {result &&
            result.map(({ checkInEntry, articleEntry }) => {
              const article = articleEntry.data;
              const checkIn = checkInEntry.data;

              return (
                <button
                  key={checkInEntry.id}
                  onClick={() => goToCheckIn(checkInEntry.id)}
                >
                  {article && checkIn && (
                    <CheckInItem checkIn={checkIn} article={article} />
                  )}
                </button>
              );
            })}
        </ItemList>
      </Section>
    </SectionList>
  );
};

export default ArticleCheckInsSection;
