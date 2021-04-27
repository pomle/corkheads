import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { useUserProfile } from "components/hooks/db/useUserProfile";
import ImageSelect from "components/ui/trigger/ImageSelect";
import Image from "components/ui/layout/Image";
import { User } from "types/User";
import { useImageUpload } from "components/hooks/useImageUpload";
import { Theme } from "components/ui/theme/themes";
import { Colors } from "components/ui/theme/colors";
import Username from "components/fragments/User/Username";
import AvatarPlaceholder from "assets/graphics/avatar-placeholder.svg";
import { ReactComponent as CameraIcon } from "assets/graphics/icons/camera.svg";
import { useMe } from "components/hooks/useMe";
import { useImage } from "components/hooks/db/useImages";
import { useSession } from "components/context/SessionContext";
import { createPath, useScreen } from "components/context/ScreenContext";
import PictureView from "components/views/PictureView";
import { ZoomCenter } from "components/ui/transitions/Zoom";
import AreaButton from "components/ui/trigger/AreaButton";

type StyleProps = {
  hasPhoto: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  ProfileHead: {
    alignItems: "center",
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gridGap: "16px",
    "& > .avatar": {
      margin: "auto",
    },
  },
  photo: {
    border: `1px dashed ${Colors.MarbleBlue}`,
    borderWidth: (props: StyleProps) => (props.hasPhoto ? 0 : "1px"),
    borderRadius: "50%",
    overflow: "hidden",
    height: "96px",
    transition: "all 1s ease",
    width: "96px",
    "-webkit-mask-image": "-webkit-radial-gradient(white, black)",
    "& .placeholder": {
      alignItems: "center",
      background: theme.color.surface,
      display: "flex",
      justifyContent: "center",
      "& svg": {
        width: "40%",
        "& path": {
          stroke: Colors.MarbleBlue,
        },
      },
    },
    "& .image": {
      backgroundImage: `url(${AvatarPlaceholder})`,
      backgroundSize: "contain",
      height: "100%",
      width: "100%",
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

function resolveDisplayName(user: User, sessionUser?: firebase.User) {
  if (user.profile) {
    const profile = user.profile;
    if (profile.displayName) {
      return profile.displayName;
    }
  }

  if (sessionUser && user.id === sessionUser.uid) {
    return sessionUser.email;
  }

  return "• • •";
}

const picturePath = createPath("/picture");

interface ProfileHeadProps {
  userId: string;
}

const ProfileHead: React.FC<ProfileHeadProps> = ({ userId }) => {
  const me = useMe();
  const session = useSession();

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

  const goToPicture = useScreen({
    path: picturePath,
    render: () => <PictureView imageId={user.profile?.imageId} />,
    transition: ZoomCenter,
  });

  const hasPhoto = !!user.profile?.imageId;

  let displayImage = undefined;
  if (hasPhoto) {
    displayImage = image;
  }

  const classes = useStyles({ hasPhoto });

  let photo = (
    <div className={classes.photo}>
      <div className="image">
        <Image image={displayImage} size="30vw" />
      </div>

      {isMe && !hasPhoto && (
        <div className="placeholder">
          <CameraIcon />
        </div>
      )}
    </div>
  );

  if (isMe) {
    photo = <ImageSelect onFile={handleImageSelect}>{photo}</ImageSelect>;
  } else {
    photo = <AreaButton onClick={() => goToPicture({})}>{photo}</AreaButton>;
  }

  return (
    <div className={classes.ProfileHead}>
      <div className="avatar">{photo}</div>

      <div className={classes.identity}>
        <div className="displayName">
          <h2>{resolveDisplayName(user, session.user)}</h2>
        </div>
        <div className="username">{user && <Username user={user} />}</div>
      </div>
    </div>
  );
};

export default ProfileHead;
