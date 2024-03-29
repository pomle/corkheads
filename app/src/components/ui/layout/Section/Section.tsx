import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  Section: {
    padding: "16px",
    background: theme.color.surface,
    "& > header": {
      color: theme.color.text,
      marginBottom: "16px",
    },
  },
  content: {},
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
