import React, { useCallback, useMemo, useState } from "react";
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
  placeholder?: string;
  fit: Fit;
  ready: boolean;
};

const useStyles = makeStyles({
  Image: {
    backgroundImage: (props: StyleProps) => {
      if (props.placeholder) {
        return `url(${props.placeholder})`;
      }
      return "none";
    },
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100%",
    position: "relative",
    width: "100%",
    "& img": {
      height: "100%",
      objectFit: (props: StyleProps) => props.fit,
      opacity: (props: StyleProps) => (props.ready ? 1 : 0),
      position: "absolute",
      top: 0,
      transition: "opacity 0.3s ease",
      width: "100%",
    },
  },
});

interface ImageProps {
  image?: ImageType | string;
  placeholder?: string;
  fit?: Fit;
  size?: string;
}

const Image: React.FC<ImageProps> = ({
  image,
  placeholder,
  fit = "cover",
  size,
}) => {
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

  const [ready, setReady] = useState<boolean>(false);

  const handleImage = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setReady(event.currentTarget.complete);
    },
    [setReady]
  );

  const classes = useStyles({ fit, ready, placeholder });

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
        {src && (
          <img
            key={src}
            src={src}
            sizes={size}
            alt=""
            loading="lazy"
            onLoad={handleImage}
            onLoadStart={handleImage}
          />
        )}
      </picture>
    </div>
  );
};

export default Image;
