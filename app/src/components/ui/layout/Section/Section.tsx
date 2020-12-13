import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  Section: {
    background: theme.color.surface,
    "& > header": {
      color: theme.color.text,
      padding: "16px 16px 0 16px",
    },
  },
  content: {
    padding: "16px 24px",
  },
}));

interface SectionProps {
  header: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ header, children }) => {
  const classes = useStyles();
  return (
    <section className={classes.Section}>
      <header>{header}</header>
      <div className={classes.content}>{children}</div>
    </section>
  );
};

export default Section;
