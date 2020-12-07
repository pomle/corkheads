import React, { useCallback, useEffect } from "react";
import { firestore } from "firebase/app";
import { makeStyles } from "@material-ui/styles";
import { UserData, useUserData } from "components/hooks/db/useUserData";
import ImageSelect from "components/ui/trigger/ImageSelect";
import Photo from "components/ui/layout/Photo";
import { User } from "types/User";
import { usePhotoUpload } from "components/hooks/usePhotoUpload";
import { useSwitch } from "components/hooks/useSwitch";
import ViewStack from "components/ui/layout/ViewStack";
import { ReactComponent as CancelIcon } from "assets/graphics/icons/cancel.svg";
import { ReactComponent as CameraIcon } from "assets/graphics/icons/camera.svg";
import { Theme } from "components/ui/theme/themes";
import { useUser } from "components/hooks/useUser";

type StyleProps = {
  canClear: boolean;
  hasPhoto: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  profileHead: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginBottom: "48px",
  },
  photoControl: {
    position: "relative",
    "& button.clear": {
      opacity: (props: StyleProps) => (props.canClear ? 1 : 0),
      padding: "8px",
      position: "absolute",
      pointerEvents: (props: StyleProps) => (props.canClear ? "all" : "none"),
      right: 0,
      top: 0,
      transition: "opacity 0.3s ease",
      "& svg": {
        height: "12px",
        width: "12px",
        "& path": {
          fill: theme.color.accent,
        },
      },
    },
  },
  photo: {
    border: "dashed 1px",
    borderColor: (props: StyleProps) =>
      props.hasPhoto ? "transparent" : theme.color.text,
    borderRadius: "50%",
    margin: "8px",
    overflow: "hidden",
    height: "128px",
    transition: "all 1s ease",
    width: "128px",
    "& .placeholder": {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      "& svg": {
        width: "50%",
      },
    },
  },
  identity: {
    color: theme.color.accent,
    fontSize: "20px",
    margin: "16px",
  },
}));

function resolveDisplayName(userData: UserData, user?: User) {
  if (userData.profile) {
    const profile = userData.profile;
    if (profile.displayName) {
      return profile.displayName;
    }
  }

  if (user?.email) {
    return user.email;
  }

  return "Drinker Drinkinson";
}

interface ProfileHeadProps {
  userId: string;
}

const ProfileHead: React.FC<ProfileHeadProps> = ({ userId }) => {
  const user = useUser();
  const { userData, updateProfile } = useUserData(userId);

  const clearControl = useSwitch(false);

  useEffect(() => {
    if (clearControl.active) {
      const timer = setTimeout(clearControl.off, 5000);
      return () => clearTimeout(timer);
    }
  }, [clearControl]);

  const uploadFile = usePhotoUpload();

  const handleImageSelect = useCallback(
    async (file: File) => {
      const photoURL = await uploadFile(file);
      updateProfile({ photoURL });
    },
    [updateProfile, uploadFile]
  );

  const handleRemove = useCallback(() => {
    updateProfile({
      photoURL: firestore.FieldValue.delete(),
    });
    clearControl.off();
  }, [clearControl, updateProfile]);

  let photoURL;
  if (userData.profile) {
    photoURL = userData.profile.photoURL;
  }

  const hasPhoto = !!photoURL;
  const canClear = clearControl.active && hasPhoto;

  const classes = useStyles({ canClear, hasPhoto });

  return (
    <div className={classes.profileHead}>
      <div className={classes.photoControl}>
        <button type="button" className="clear" onClick={handleRemove}>
          <CancelIcon />
        </button>

        <ImageSelect onFile={handleImageSelect}>
          <div className={classes.photo}>
            <ViewStack>
              <div className="placeholder">
                <CameraIcon />
              </div>
              <div className="image">
                <Photo url={photoURL} />
              </div>
            </ViewStack>
          </div>
        </ImageSelect>
      </div>

      <h2 className={classes.identity}>{resolveDisplayName(userData, user)}</h2>
    </div>
  );
};

export default ProfileHead;
