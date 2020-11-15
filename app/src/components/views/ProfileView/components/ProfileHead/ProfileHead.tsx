import React from "react";
import { makeStyles } from "@material-ui/styles";

type StyleProps = {
  photoURL?: string;
};

function backgroundImage({ photoURL }: StyleProps) {
  if (photoURL) {
    return `url(${photoURL})`;
  }

  return "none";
}

const useStyles = makeStyles({
  profileHead: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginBottom: "40px",
  },
  photo: {
    backgroundColor: "#fff",
    backgroundImage,
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "50%",
    margin: "24px",
    overflow: "hidden",
    height: "120px",
    width: "120px",
  },
  identity: {
    color: "#5a5a5a",
    fontSize: "17px",
    fontWeight: 700,
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
  const classes = useStyles({
    photoURL: user.photoURL || undefined,
  });

  return (
    <div className={classes.profileHead}>
      <div className={classes.photo}></div>
      <h2 className={classes.identity}>{resolveTitle(user)}</h2>
    </div>
  );
};

export default ProfileHead;
