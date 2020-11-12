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

interface ProfileHeadProps {}

const ProfileHead: React.FC<ProfileHeadProps> = () => {
  const classes = useStyles();
  return (
    <div className={classes.profileHead}>
      <div className={classes.photo}></div>
      <h2>Drinker Drinkinson</h2>
    </div>
  );
};

export default ProfileHead;
