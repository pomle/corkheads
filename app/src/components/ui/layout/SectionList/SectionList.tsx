import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  SectionList: {
    "& > *": {
      marginBottom: "16px",
      "&:last-child": {
        marginBottom: 0,
      },
    },
  },
});

interface SectionListProps {}

const SectionList: React.FC<SectionListProps> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.SectionList}>{children}</div>;
};

export default SectionList;
