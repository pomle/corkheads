import React from "react";
import { makeStyles } from "@material-ui/styles";
import ImageItem from "components/ui/layout/ImageItem";
import { Theme } from "components/ui/theme/themes";
import { User } from "types/User";

const useStyles = makeStyles((theme: Theme) => ({
  displayName: {
    color: theme.color.action,
    fontSize: "14px",
    fontWeight: 700,
    gridColumn: "1 / 3",
  },
  subText: {
    color: theme.color.text,
    fontSize: "12px",
    fontWeight: 500,
  },
  timestamp: {
    color: theme.color.text + "60",
    fontSize: "10px",
    textAlign: "right",
  },
  rating: {
    gridColumn: "1 / 3",
  },
}));

interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const profile = user.profile;
  const photoURL = profile?.photoURL;

  const classes = useStyles();

  return (
    <ImageItem imageURL={photoURL}>
      <div className={classes.displayName}>
        {user.username ? `@${user.username}` : "-"}
      </div>
    </ImageItem>
  );
};

export default UserItem;
