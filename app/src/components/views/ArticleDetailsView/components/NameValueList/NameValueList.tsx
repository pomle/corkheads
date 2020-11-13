import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
  NameValueList: {
    "& > *": {
      borderTop: "solid 1px #979797",
      "&:first-child": {
        borderTop: "none",
      },
    },
  },
});

interface NameValueListProps {}

const NameValueList: React.FC<NameValueListProps> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.NameValueList}>{children}</div>;
};

export default NameValueList;
