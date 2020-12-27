import React from "react";
import { makeStyles } from "@material-ui/styles";
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
  pointer: { userId: string };
}

const SearchUserItem: React.FC<SearchUserItemProps> = ({ pointer }) => {
  const classes = useStyles();

  return (
    <div className={classes.SearchUserItem}>
      <UserItem pointer={pointer} />
      <div className={classes.state}>
        <button type="button">Friends</button>
      </div>
    </div>
  );
};

export default SearchUserItem;
