import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useCheckInComments } from "components/hooks/db/useCheckInComments";
import { useMe } from "components/hooks/useMe";
import Input from "components/ui/input/Input/Input";

const useStyles = makeStyles({
  Comments: {},
});

interface CommentsProps {
  checkInId: string;
}

const Comments: React.FC<CommentsProps> = ({ checkInId }) => {
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
      <ul>
        {comments &&
          comments.map((comment) => {
            return <li>{comment.body}</li>;
          })}
      </ul>

      <div>
        <Input value={comment} onChange={setComment} />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Comments;
