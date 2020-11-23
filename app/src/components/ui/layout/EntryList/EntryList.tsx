import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  EntryList: {
    "& tbody": {
      "& tr": {
        borderBottom: "solid 1px #e2e2e2",
        "&:last-child": {
          border: "none",
        },
      },
    },
  },
});

interface EntryListProps {}

const EntryList: React.FC<EntryListProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <table className={classes.EntryList}>
      <tbody>{children}</tbody>
    </table>
  );
};

export default EntryList;
