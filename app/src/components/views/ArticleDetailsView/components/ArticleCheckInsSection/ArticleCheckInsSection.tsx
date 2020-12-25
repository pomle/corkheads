import React, { useMemo } from "react";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";
import ItemList from "components/ui/layout/ItemList";
import SectionList from "components/ui/layout/SectionList/SectionList";
import Section from "components/ui/layout/Section";
import SectionTitle from "components/ui/layout/SectionTitle";
import CheckInItemButton from "components/fragments/CheckIn/CheckInItem/Button";

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
          {request.results.map((pointer) => {
            return (
              <CheckInItemButton pointer={pointer} route={routes.checkIn} />
            );
          })}
        </ItemList>
      </Section>
    </SectionList>
  );
};

export default ArticleCheckInsSection;
