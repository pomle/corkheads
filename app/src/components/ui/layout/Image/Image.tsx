import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/styles";
import { Image as ImageType } from "types/Image";

const FALLBACK_URL = undefined;

type Format = ImageType["formats"][0];

const sort = {
  byResolution(a: Format, b: Format) {
    return b.resolution.x - a.resolution.x;
  },
};

type Fit = "cover" | "contain";

type StyleProps = {
  fit: Fit;
};

const useStyles = makeStyles({
  Image: {
    height: "100%",
    position: "relative",
    width: "100%",
    "& img": {
      height: "100%",
      objectFit: (props: StyleProps) => props.fit,
      position: "absolute",
      top: 0,
      width: "100%",
    },
  },
});

interface ImageProps {
  image?: ImageType | string;
  fit?: Fit;
  size?: string;
}

const Image: React.FC<ImageProps> = ({ image, fit = "cover", size }) => {
  const formats = useMemo(() => {
    if (typeof image === "object") {
      return Array.from(image.formats).sort(sort.byResolution);
    }
  }, [image]);

  const srcSet = useMemo(() => {
    if (!formats) {
      return;
    }

    return formats
      .map((format) => {
        return `${format.url} ${format.resolution.x}w`;
      })
      .join(",");
  }, [formats]);

  const src = useMemo(() => {
    if (formats) {
      return Array.from(formats)
        .filter((format) => {
          return format.url.endsWith("jpeg");
        })
        .find((format) => format.resolution.x < 900)?.url;
    }

    if (typeof image === "string") {
      return image;
    }

    return FALLBACK_URL;
  }, [image, formats]);

  const classes = useStyles({ fit });

  return (
    <div className={`Image ${classes.Image}`}>
      {(src || srcSet) && <img srcSet={srcSet} src={src} sizes={size} alt="" />}
    </div>
  );
};

export default Image;
