import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import Photo from "components/ui/layout/Photo";

const useStyles = makeStyles((theme: Theme) => ({
  CutoutImageItem: {
    alignItems: "center",
    background: theme.color.surface,
    borderRadius: "8px",
    color: theme.color.text,
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "64px auto",
    minHeight: "64px",
    overflow: "hidden",
  },
  photo: {
    background: theme.color.panel,
    height: "100%",
    width: "100%",
  },
}));

interface CutoutImageItemProps {
  photoURL?: string;
}

const CutoutImageItem: React.FC<CutoutImageItemProps> = ({
  photoURL,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.CutoutImageItem}>
      <div className={classes.photo}>
        <Photo url={photoURL} />
      </div>
      {children}
    </div>
  );
};

export default CutoutImageItem;
