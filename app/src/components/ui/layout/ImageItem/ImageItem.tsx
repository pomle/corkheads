import React from "react";
import { makeStyles } from "@material-ui/styles";
import Image from "components/ui/layout/Image";
import { Theme } from "components/ui/theme/themes";
import { useImage } from "components/hooks/db/useImages";

type StyleProps = {
  imageSize: number;
};

const size = (props: StyleProps) => `${props.imageSize}px`;

const useStyles = makeStyles((theme: Theme) => ({
  ImageItem: {
    alignItems: "start",
    background: theme.color.surface,
    color: theme.color.text,
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr)",
    gridGap: "16px",
  },
  photo: {
    background: theme.color.panel,
    borderRadius: "8px",
    overflow: "hidden",
    height: "64px",
    transform: "scale(1)",
    width: "64px",
    "-webkit-mask-image": "-webkit-radial-gradient(white, black)",
    "@media (min-width: 360px)": {
      height: size,
      width: size,
    },
  },
}));

interface ImageItemProps {
  imageId?: string;
  imageURL?: string;
  placeholderURL?: string;
  size?: number;
}

const ImageItem: React.FC<ImageItemProps> = ({
  imageId,
  imageURL,
  placeholderURL,
  size = 64,
  children,
}) => {
  const image = useImage(imageId)?.data || imageURL;

  const classes = useStyles({ imageSize: size });

  return (
    <div className={classes.ImageItem}>
      <div className={classes.photo}>
        <Image image={image} placeholder={placeholderURL} size="20vw" />
      </div>
      {children}
    </div>
  );
};

export default ImageItem;
