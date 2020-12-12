import React, { useMemo } from "react";
import { createMediaURL } from "lib/resourceRouting";
import { makeStyles } from "@material-ui/styles";
import { ImageRef } from "types/ImageRef";

const useStyles = makeStyles({
  ImageResource: {
    "& img": {
      height: "100%",
      objectFit: "contain",
      objectPosition: "center",
      width: "100%",
    },
  },
});

interface ImageResourceProps {
  imageRef: ImageRef;
  alt?: string;
}

const ImageResource: React.FC<ImageResourceProps> = ({
  imageRef,
  alt = "",
}) => {
  const sources = useMemo(() => {
    if (!imageRef.sizes) {
      return [];
    }

    return [...imageRef.sizes].map((size) => {
      return {
        url: createMediaURL(imageRef.id, size),
        size: size.split("x").map(parseFloat),
      };
    });
  }, [imageRef]);

  const classes = useStyles();

  return (
    <picture className={classes.ImageResource}>
      {sources.map((source) => {
        return (
          <source
            key={source.size[0].toString()}
            srcSet={`${source.url}, ${source.size[0]}w`}
            media={`(min-width: ${source.size[0] / 2}px)`}
            type="image/jpeg"
          />
        );
      })}
      <img
        src={sources.length ? sources[sources.length - 1].url : imageRef.id}
        alt={alt}
      />
    </picture>
  );
};

export default ImageResource;
