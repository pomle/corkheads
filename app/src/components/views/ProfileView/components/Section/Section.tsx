import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  section: {
    "& > header": {
      background: "#fff",
      color: "#838383",
      fontSize: "20px",
      fontWeight: 700,
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
    <section className={classes.section}>
      <header>{header}</header>
      <div className={classes.content}>{children}</div>
    </section>
  );
};

export default Section;
