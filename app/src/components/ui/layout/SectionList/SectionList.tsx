import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  sectionList: {
    marginTop: "16px",
    "& > section": {
      marginBottom: "16px",
    },
  },
});

interface SectionListProps {}

const SectionList: React.FC<SectionListProps> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.sectionList}>{children}</div>;
};

export default SectionList;
