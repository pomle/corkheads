import React from "react";
import { makeStyles } from "@material-ui/styles";
import SectionList from "components/ui/layout/SectionList";
import Section from "components/ui/layout/Section";
import SectionTitle from "components/ui/layout/SectionTitle";
import UserArticleEntries from "../UserArticleEntries";
import { Container } from "types/Container";
import { UserArticle } from "types/UserArticle";

type StyleProps = {
  owner: boolean;
};

const useStyles = makeStyles({
  collection: {
    background: "#fff",
    padding: "24px",
  },
  section: {
    marginTop: (props: StyleProps) => (props.owner ? 0 : "-100%"),
    opacity: (props: StyleProps) => (props.owner ? 1 : 0),
    pointerEvents: (props: StyleProps) => (props.owner ? "all" : "none"),
    transition: "all 1s ease",
  },
});

interface UserSectionsProps {
  userArticleEntry: Container<UserArticle>;
}

const UserSections: React.FC<UserSectionsProps> = ({ userArticleEntry }) => {
  const { owner } = userArticleEntry.data;

  const classes = useStyles({ owner });

  return (
    <SectionList>
      <div className={classes.section}>
        <Section header={<SectionTitle main="My collection" />}>
          <div className={classes.collection}>
            <UserArticleEntries userArticleEntry={userArticleEntry} />
          </div>
        </Section>
      </div>
    </SectionList>
  );
};

export default UserSections;
