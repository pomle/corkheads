import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useCheckInComments } from "components/hooks/db/useCheckInComments";
import { useMe } from "components/hooks/useMe";
import { ReactComponent as SendIcon } from "assets/graphics/send.svg";
import { Colors } from "components/ui/theme/colors";
import Comment from "./components/Comment";

const useStyles = makeStyles({
  Comments: {
    display: "grid",
    gridTemplateRows: "auto auto",
    gridGap: "16px",
    "& .control": {
      display: "grid",
      gridTemplateColumns: "1fr 48px",
      gridGap: "16px",
      "& button": {
        background: Colors.Sky,
        borderRadius: "8px",
        height: "48px",
        "& svg": {
          height: "24px",
          margin: "auto",
          width: "24px",
        },
      },
      "& input": {
        background: Colors.Sky,
        borderRadius: "8px",
        height: "48px",
        padding: "4px 16px",
      },
    },
    "& .messages": {
      display: "grid",
      gridAutoFlow: "row",
      gridGap: "16px",
      listStyleType: "none",
      "& button": {
        display: "block",
        width: "100%",
      },
    },
  },
});

interface CommentsProps {
  checkInId: string;
  routes: {
    user: (userId: string) => void;
  };
}

const Comments: React.FC<CommentsProps> = ({ checkInId, routes }) => {
  const user = useMe()?.data;

  const [comment, setComment] = useState<string>("");

  const { comments, addComment } = useCheckInComments(checkInId);

  const handleAdd = useCallback(async () => {
    if (!user) {
      return;
    }

    await addComment(user.id, comment);

    setComment("");
  }, [user, comment, addComment]);

  const classes = useStyles();

  return (
    <div className={classes.Comments}>
      <div className="control">
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="button" onClick={handleAdd}>
          <SendIcon />
        </button>
      </div>

      <ul className="messages">
        {comments &&
          comments.map((comment) => {
            return (
              <li key={comment.id}>
                <button onClick={() => routes.user(comment.userId)}>
                  <Comment comment={comment} />
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Comments;
