import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { UserData, useUserData } from "components/hooks/db/useUserData";
import ImageSelect from "components/ui/trigger/ImageSelect";
import Photo from "components/ui/layout/Photo";
import { User } from "types/User";
import { usePhotoUpload } from "components/hooks/usePhotoUpload";

const useStyles = makeStyles({
  profileHead: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginBottom: "40px",
  },
  photo: {
    backgroundColor: "#fff",
    borderRadius: "50%",
    margin: "24px",
    overflow: "hidden",
    height: "140px",
    width: "140px",
  },
  identity: {
    color: "#5a5a5a",
    fontSize: "17px",
    fontWeight: 700,
  },
});

function resolveTitle(user: firebase.User, userData: UserData) {
  if (userData.displayName) {
    return userData.displayName;
  }

  if (user.email) {
    return user.email;
  }

  return "Drinker Drinkinson";
}

interface ProfileHeadProps {
  user: User;
}

const ProfileHead: React.FC<ProfileHeadProps> = ({ user }) => {
  const [userData, setUserData] = useUserData(user.uid);

  const uploadFile = usePhotoUpload();

  const handleImageSelect = useCallback(
    async (file: File) => {
      const photoURL = await uploadFile(file);
      setUserData({ ...userData, photoURL });
    },
    [userData, setUserData, uploadFile]
  );

  const { photoURL } = userData;

  const classes = useStyles();

  return (
    <div className={classes.profileHead}>
      <ImageSelect onFile={handleImageSelect}>
        <div className={classes.photo}>
          <Photo url={photoURL} />
        </div>
      </ImageSelect>

      <h2 className={classes.identity}>{resolveTitle(user, userData)}</h2>
    </div>
  );
};

export default ProfileHead;
