import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  Section: {
    background: theme.color.surface,
    "& > header": {
      color: "#8f96a2",
      padding: "16px 4px",
    },
  },
  content: {
    display: "grid",
    gridAutoFlow: "row",
    gridGap: "2px",
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
