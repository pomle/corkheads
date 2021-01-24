import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { useUserProfile } from "components/hooks/db/useUserProfile";
import ImageSelect from "components/ui/trigger/ImageSelect";
import Image from "components/ui/layout/Image";
import { User } from "types/User";
import { useImageUpload } from "components/hooks/useImageUpload";
import ViewStack from "components/ui/layout/ViewStack";
import { Theme } from "components/ui/theme/themes";
import { Colors } from "components/ui/theme/colors";
import Username from "components/fragments/User/Username";
import AvatarPlaceholder from "assets/graphics/avatar-placeholder.svg";
import { ReactComponent as CameraIcon } from "assets/graphics/icons/camera.svg";
import { useMe } from "components/hooks/useMe";
import { useImage } from "components/hooks/db/useImages";

type StyleProps = {
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
    fontSize: "15px",
    lineHeight: 1,
    "& .username": {
      color: Colors.MarbleBlue,
      fontSize: "14px",
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

  const isMe = me?.id === userId;

  const { user, updateProfile } = useUserProfile(userId);

  const image = useImage(user.profile?.imageId)?.data;

  const uploadFile = useImageUpload();

  const handleImageSelect = useCallback(
    async (file: File) => {
      const imageId = (await uploadFile(file)).id;
      updateProfile({ imageId });
    },
    [updateProfile, uploadFile]
  );

  const hasPhoto = !!user.profile?.imageId;

  let displayImage = undefined;
  if (hasPhoto) {
    displayImage = image;
  } else if (!isMe) {
    displayImage = AvatarPlaceholder;
  }

  const classes = useStyles({ hasPhoto });

  let photo = (
    <div className={classes.photo}>
      <ViewStack>
        {isMe && !hasPhoto && (
          <div className="placeholder">
            <CameraIcon />
          </div>
        )}
        <div className="image">
          <Image image={displayImage} size="30vw" />
        </div>
      </ViewStack>
    </div>
  );

  if (isMe) {
    photo = <ImageSelect onFile={handleImageSelect}>{photo}</ImageSelect>;
  }

  return (
    <div className={classes.ProfileHead}>
      {photo}

      <div className={classes.identity}>
        <div className="displayName">
          <h2>{resolveDisplayName(user)}</h2>
        </div>
        <div className="username">{user && <Username user={user} />}</div>
      </div>
    </div>
  );
};

export default ProfileHead;
