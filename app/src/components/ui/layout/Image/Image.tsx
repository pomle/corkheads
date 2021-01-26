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

  const mimeTypes = useMemo(() => {
    if (!formats) {
      return [];
    }

    const mimes = new Set<string>();
    for (const format of formats) {
      if (format.mime) {
        mimes.add(format.mime);
      }
    }
    return Array.from(mimes);
  }, [formats]);

  const src = useMemo(() => {
    if (formats) {
      if (formats.length === 1) {
        return formats[0].url;
      }

      const knownJPEGs = formats.filter((format) => {
        return format.mime?.endsWith("jpeg") || format.url?.endsWith("jpeg");
      });

      if (knownJPEGs.length > 0) {
        return knownJPEGs.find((format) => format.resolution.x < 900)?.url;
      }

      return formats.find((format) => format.resolution.x < 900)?.url;
    }

    if (typeof image === "string") {
      return image;
    }

    return FALLBACK_URL;
  }, [image, formats]);

  const classes = useStyles({ fit });

  return (
    <div className={`Image ${classes.Image}`}>
      <picture>
        {formats &&
          mimeTypes.map((mime) => {
            const srcSet = formats
              .filter((f) => f.mime === mime)
              .map((format) => {
                return `${format.url} ${format.resolution.x}w`;
              })
              .join(",");

            return <source key={mime} type={mime} srcSet={srcSet} />;
          })}
        {src && <img src={src} sizes={size} alt="" />}
      </picture>
    </div>
  );
};

export default Image;
