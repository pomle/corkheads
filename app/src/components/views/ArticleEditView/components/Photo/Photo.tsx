import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  Photo: {
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    border: "dashed 2px #e2e2e2",
    display: "flex",
    fontSize: "18px",
    fontWeight: 500,
    justifyContent: "center",
    height: "300px",
    margin: "auto",
    width: "300px",
    "& > video": {
      objectFit: "cover",
      objectPosition: "center",
      height: "100%",
      width: "100%",
    },
  },
});

function useMediaStream() {
  const [stream, setStream] = useState<MediaStream>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        console.log(stream);
        setStream(stream);
      });
  }, []);

  return stream;
}

const VideoStream: React.FC<PhotoProps> = () => {
  const stream = useMediaStream();

  const videoElement = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const video = videoElement.current;
    if (video) {
      if (stream) {
        video.srcObject = stream;
        video.play();
      } else {
        video.pause();
        video.srcObject = null;
      }
    }
  }, [stream]);

  return <video ref={videoElement} />;
};

interface PhotoProps {}

const Photo: React.FC<PhotoProps> = () => {
  const [cameraActive, setCameraActive] = useState<boolean>(false);

  const classes = useStyles();

  return (
    <div
      className={classes.Photo}
      onPointerDown={() => setCameraActive((state) => !state)}
    >
      {cameraActive ? <VideoStream /> : "Upload Photo"}
    </div>
  );
};

export default Photo;
