import React from "react";
import { makeStyles } from "@material-ui/styles";
import { SearchResult } from "components/hooks/db/useUserSearch";
import UserItem from "../UserItem";

const useStyles = makeStyles({
  SearchUserItem: {
    alignItems: "center",
    display: "flex",
    "& > *:first-child": {
      flex: "1",
    },
  },
  state: {
    flex: "0",
  },
});

interface SearchUserItemProps {
  result: SearchResult;
}

const SearchUserItem: React.FC<SearchUserItemProps> = ({ result }) => {
  const classes = useStyles();

  return (
    <div className={classes.SearchUserItem}>
      <UserItem pointer={result} />
      <div className={classes.state}>
        <button type="button">Friends</button>
      </div>
    </div>
  );
};

export default SearchUserItem;
