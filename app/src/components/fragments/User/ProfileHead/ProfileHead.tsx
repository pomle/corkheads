import React, { useCallback, useEffect } from "react";
import { firestore } from "firebase/app";
import { makeStyles } from "@material-ui/styles";
import { useUserProfile } from "components/hooks/db/useUserProfile";
import ImageSelect from "components/ui/trigger/ImageSelect";
import Photo from "components/ui/layout/Photo";
import { User } from "types/User";
import { usePhotoUpload } from "components/hooks/usePhotoUpload";
import { useSwitch } from "components/hooks/useSwitch";
import ViewStack from "components/ui/layout/ViewStack";
import { Theme } from "components/ui/theme/themes";
import { Colors } from "components/ui/theme/colors";
import Username from "components/fragments/User/Username";
import { ReactComponent as CancelIcon } from "assets/graphics/icons/cancel.svg";
import { ReactComponent as CameraIcon } from "assets/graphics/icons/camera.svg";
import { useMe } from "components/hooks/useMe";

type StyleProps = {
  canClear: boolean;
  hasPhoto: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  ProfileHead: {
    alignItems: "center",
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "auto 1fr",
    gridGap: "16px",
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
      props.hasPhoto ? "transparent" : Colors.MarbleBlue,
    borderRadius: "50%",
    overflow: "hidden",
    height: "96px",
    transition: "all 1s ease",
    width: "96px",
    "& .placeholder": {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      "& svg": {
        width: "40%",
        "& path": {
          stroke: Colors.MarbleBlue,
        },
      },
    },
  },
  identity: {
    color: Colors.X1,
    display: "grid",
    gridGap: "4px",
    fontSize: "14px",
    lineHeight: 1,
    "& .username": {
      color: Colors.MarbleBlue,
      fontSize: "12px",
    },
  },
}));

function resolveDisplayName(user: User) {
  if (user.profile) {
    const profile = user.profile;
    if (profile.displayName) {
      return profile.displayName;
    }
  }

  return "Anonymous";
}

interface ProfileHeadProps {
  userId: string;
}

const ProfileHead: React.FC<ProfileHeadProps> = ({ userId }) => {
  const me = useMe();
  const { user, updateProfile } = useUserProfile(userId);

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
  if (user.profile) {
    photoURL = user.profile.photoURL;
  }

  const hasPhoto = !!photoURL;
  const canClear = clearControl.active && hasPhoto;

  const classes = useStyles({ canClear, hasPhoto });

  let photo = (
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
  );

  if (me && me.id === userId) {
    photo = <ImageSelect onFile={handleImageSelect}>{photo}</ImageSelect>;
  }

  return (
    <div className={classes.ProfileHead}>
      <div className={classes.photoControl}>
        <button type="button" className="clear" onClick={handleRemove}>
          <CancelIcon />
        </button>

        {photo}
      </div>

      <div className={classes.identity}>
        <h2>{resolveDisplayName(user)}</h2>
        {user && <Username user={user} />}
      </div>
    </div>
  );
};

export default ProfileHead;
