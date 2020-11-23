import React from "react";
import { makeStyles } from "@material-ui/styles";
import SectionList from "components/ui/layout/SectionList";
import Section from "components/ui/layout/Section";
import SectionTitle from "components/ui/layout/SectionTitle";
import UserArticleEntries from "../UserArticleEntries";
import { Container } from "types/Container";
import { UserArticle } from "types/UserArticle";

const useStyles = makeStyles({
  collection: {
    background: "#fff",
    padding: "24px",
  },
});

interface UserSectionsProps {
  userArticleEntry: Container<UserArticle>;
}

const UserSections: React.FC<UserSectionsProps> = ({ userArticleEntry }) => {
  const classes = useStyles();

  return (
    <SectionList>
      <Section header={<SectionTitle main="My collection" />}>
        <div className={classes.collection}>
          <UserArticleEntries />
        </div>
      </Section>
    </SectionList>
  );
};

export default UserSections;
