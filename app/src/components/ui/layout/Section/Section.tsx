import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  Section: {
    "& > header": {
      background: "#fff",
      color: "#838383",
      padding: "16px 20px",
    },
  },
  content: {
    display: "grid",
    gridAutoFlow: "row",
    gridGap: "2px",
    marginTop: "2px",
  },
});

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
