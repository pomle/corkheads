import React, { useMemo } from "react";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";
import SectionList from "components/ui/layout/SectionList/SectionList";
import Section from "components/ui/layout/Section";
import SectionTitle from "components/ui/layout/SectionTitle";
import CheckInList from "components/fragments/CheckIn/CheckInList";

interface ArticleCheckInsSectionProps {
  articleId: string;
}

const ArticleCheckInsSection: React.FC<ArticleCheckInsSectionProps> = ({
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
        <CheckInList pointers={request.results} context="article" />
      </Section>
    </SectionList>
  );
};

export default ArticleCheckInsSection;
