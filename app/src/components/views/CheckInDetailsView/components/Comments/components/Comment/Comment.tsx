import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Comment as CommentType } from "types/Comment";
import { useUser } from "components/hooks/db/useUsers";
import Username from "components/fragments/User/Username";
import Image from "components/ui/layout/Image";
import AvatarPlaceholder from "assets/graphics/avatar-placeholder.svg";
import { useImage } from "components/hooks/db/useImages";
import { Colors } from "components/ui/theme/colors";
import PassedTime from "components/ui/format/PassedTime";

const useStyles = makeStyles({
  Comment: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gridGap: "16px",
    "& .avatar": {
      borderRadius: "50%",
      height: "48px",
      overflow: "hidden",
      width: "48px",
    },
    "& .content": {
      background: Colors.Sky,
      borderRadius: "8px",
      padding: "16px",
      "& .author": {
        alignItems: "center",
        display: "flex",
        fontSize: "12px",
        paddingBottom: "8px",
      },
      "& .body": {},
    },
  },
});

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const classes = useStyles();

  const user = useUser(comment.userId)?.data;
  const image = useImage(user?.profile?.imageId)?.data;

  return (
    <div className={classes.Comment}>
      <div className="avatar">
        <Image image={image || AvatarPlaceholder} />
      </div>

      <div className="content">
        <div className="author">
          <div className="username">{user && <Username user={user} />}</div>
          {comment.timestamp && (
            <>
              &ensp;•&ensp;
              <div className="timestamp">
                <PassedTime date={comment.timestamp} />
              </div>
            </>
          )}
        </div>
        <div className="body">{comment.body}</div>
      </div>
    </div>
  );
};

export default Comment;
