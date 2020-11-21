import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDB } from "components/hooks/useDB";
import ToggleButton from "components/ui/trigger/ToggleButton";
import { useUserArticle } from "components/hooks/db/useUserArticles";
import { useUser } from "components/hooks/useUser";
import { User } from "types/user";

const useStyles = makeStyles({
  Collection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridAutoFlow: "column",
    gridGap: "16px",
    padding: "16px",
  },
});

type Payload = {
  owner?: boolean;
  tryIt?: boolean;
};

export function useUpdate(userId: string, articleId: string) {
  const db = useDB();

  return useCallback(
    (meta: Payload) => {
      return db
        .collection("users")
        .doc(userId)
        .collection("articles")
        .doc(articleId)
        .set(meta, { merge: true });
    },
    [db, userId, articleId]
  );
}

interface CollectionProps {
  articleId: string;
}

const Collection: React.FC<CollectionProps> = ({ articleId }) => {
  const user = useUser();

  if (!user) {
    return null;
  }

  return <CollectionUser user={user} articleId={articleId} />;
};

export default Collection;

const CollectionUser: React.FC<{ user: User; articleId: string }> = ({
  user,
  articleId,
}) => {
  const userArticleResult = useUserArticle(user?.uid || "", articleId);
  const userArticle = userArticleResult.data;

  const updateMeta = useUpdate(user?.uid || "", articleId);

  const setOwner = useCallback(
    (owner: boolean) => {
      updateMeta({ owner });
    },
    [updateMeta]
  );

  const setTryer = useCallback(
    (tryIt: boolean) => {
      updateMeta({ tryIt });
    },
    [updateMeta]
  );

  const classes = useStyles();

  if (!userArticle) {
    return null;
  }

  const { owner, tryIt } = userArticle.data;

  return (
    <div className={classes.Collection}>
      <ToggleButton toggled={owner} onClick={() => setOwner(!owner)}>
        I own it
      </ToggleButton>
      <ToggleButton toggled={tryIt} onClick={() => setTryer(!tryIt)}>
        I want to try it
      </ToggleButton>
    </div>
  );
};
