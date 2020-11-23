import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import ToggleButton from "components/ui/trigger/ToggleButton";
import { UserArticle } from "types/UserArticle";
import { Container } from "types/Container";

const useStyles = makeStyles({
  Collection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridAutoFlow: "column",
    gridGap: "16px",
    padding: "16px",
  },
});

interface CollectionProps {
  userArticleEntry: Container<UserArticle>;
}

const Collection: React.FC<CollectionProps> = ({ userArticleEntry }) => {
  const updateMeta = useCallback(
    (data: Partial<UserArticle>) => {
      userArticleEntry.ref.set(data, { merge: true });
    },
    [userArticleEntry]
  );

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

  const { owner, tryIt } = userArticleEntry.data;

  const classes = useStyles();

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

export default Collection;
