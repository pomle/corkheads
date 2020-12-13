import React, { useMemo } from "react";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";
import ItemList from "components/ui/layout/ItemList";
import CheckInItem from "./components/CheckInItem";
import SectionList from "components/ui/layout/SectionList/SectionList";
import Section from "components/ui/layout/Section";
import SectionTitle from "components/ui/layout/SectionTitle";

interface ArticleCheckInsSectionProps {
  routes: {
    checkIn: (checkInId: string) => void;
  };
  articleId: string;
}

const ArticleCheckInsSection: React.FC<ArticleCheckInsSectionProps> = ({
  routes,
  articleId,
}) => {
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

  const request = useCheckInQuery(query);

  return (
    <SectionList>
      <Section header={<SectionTitle main="Recent Check ins" />}>
        <ItemList>
          {request.results.map(({ checkInEntry, articleEntry }) => {
            const article = articleEntry.data;
            const checkIn = checkInEntry.data;

            return (
              <button
                key={checkInEntry.id}
                onClick={() => routes.checkIn(checkInEntry.id)}
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
