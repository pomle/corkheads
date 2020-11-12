import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  profileHead: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  photo: {
    background: "#fff",
    borderRadius: "50%",
    margin: "16px",
    overflow: "hidden",
    height: "120px",
    width: "120px",
  },
});

function resolveTitle(user: firebase.User) {
  if (user.displayName) {
    return user.displayName;
  }

  if (user.email) {
    return user.email;
  }

  return "Drinker Drinkinson";
}

interface ProfileHeadProps {
  user: firebase.User;
}

const ProfileHead: React.FC<ProfileHeadProps> = ({ user }) => {
  const classes = useStyles();
  return (
    <div className={classes.profileHead}>
      <div className={classes.photo}></div>
      <h2>{resolveTitle(user)}</h2>
    </div>
  );
};

export default ProfileHead;
