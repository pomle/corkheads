import React from "react";
import { makeStyles } from "@material-ui/styles";
import Photo from "components/ui/layout/Photo";

const useStyles = makeStyles({
  RoundedImageItem: {
    alignItems: "center",
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "64px auto",
  },
  photo: {
    borderRadius: "50%",
    overflow: "hidden",
    height: "64px",
    width: "64px",
  },
  content: {},
});

interface RoundedImageItemProps {
  photoURL?: string;
}

const RoundedImageItem: React.FC<RoundedImageItemProps> = ({
  children,
  photoURL,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.RoundedImageItem}>
      <div className={classes.photo}>
        <Photo url={photoURL} />
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default RoundedImageItem;
