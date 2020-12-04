import React from "react";
import { makeStyles } from "@material-ui/styles";
import DividedList from "../DividedList";

const useStyles = makeStyles({
  EntryList: {},
});

interface EntryListProps {}

const EntryList: React.FC<EntryListProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.EntryList}>
      <DividedList>{children}</DividedList>
    </div>
  );
};

export default EntryList;
