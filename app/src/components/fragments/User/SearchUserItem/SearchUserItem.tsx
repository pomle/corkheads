import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import RoundedImageItem from "components/ui/layout/RoundedImageItem";
import { useUser } from "components/hooks/db/useUsers";
import { SearchResult } from "components/hooks/db/useUserSearch";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: "grid",
    gridGap: "4px",
    padding: "8px",
  },
  displayName: {
    color: theme.color.action,
    fontSize: "14px",
    fontWeight: 700,
    gridColumn: "1 / 3",
  },
  state: {},
}));

interface SearchUserItemProps {
  result: SearchResult;
}

const SearchUserItem: React.FC<SearchUserItemProps> = ({
  result: { userId },
}) => {
  const user = useUser(userId)?.data;
  const profile = user?.profile;
  const photoURL = profile?.photoURL;

  const classes = useStyles();

  return (
    <RoundedImageItem photoURL={photoURL}>
      <div className={classes.content}>
        <div className={classes.displayName}>
          {user?.username ? "@" + user.username : ""}
        </div>
        <div className={classes.state}>Friends?</div>
      </div>
    </RoundedImageItem>
  );
};

export default SearchUserItem;
