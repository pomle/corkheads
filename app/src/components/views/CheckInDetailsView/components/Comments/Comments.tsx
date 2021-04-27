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
        background: Colors.Gold,
        borderRadius: "8px",
        height: "48px",
        "&:disabled": {
          background: Colors.Sky,
        },
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
        transition: "background 0.3s, boxShadow 0.3s",
        width: "100%",
        "&:focus": {
          background: Colors.White,
          boxShadow: "0 2px 8px -5px #000",
        },
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
  toUser: ({ userId }: { userId: string }) => void;
}

const Comments: React.FC<CommentsProps> = ({ checkInId, toUser }) => {
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
        <button
          type="button"
          onClick={handleAdd}
          disabled={comment.length === 0}
        >
          <SendIcon />
        </button>
      </div>

      <ul className="messages">
        {comments &&
          comments.map((comment) => {
            return (
              <li key={comment.id}>
                <button onClick={() => toUser({ userId: comment.userId })}>
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
