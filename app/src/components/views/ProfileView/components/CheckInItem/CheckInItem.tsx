import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Article } from "types/article";
import { CheckIn } from "types/checkIn";
import Rating from "components/ui/indicators/Rating";
import PassedTime from "components/ui/format/PassedTime";

type StyleProps = {
  photoURL?: string;
};

function backgroundImage({ photoURL }: StyleProps) {
  if (photoURL) {
    return `url(${photoURL})`;
  }
  return "none";
}

const useStyles = makeStyles({
  checkIn: {
    display: "flex",
  },
  photo: {
    background: "#c9c9c9",
    backgroundImage,
    backgroundPosition: "center",
    backgroundSize: "cover",
    overflow: "hidden",
    height: "85px",
    width: "85px",
  },
  meta: {
    background: "#fff",
    color: "#5a5a5a",
    display: "grid",
    flex: "1",
    gridAutoFlow: "row",
    gridGap: "4px",
    lineHeight: 1,
    padding: "14px 16px",
  },
  displayName: {
    fontSize: "17px",
    fontWeight: 700,
    gridColumn: "1 / 3",
  },
  manufacturer: {
    fontSize: "12px",
    fontWeight: 500,
  },
  timestamp: {
    color: "#e2e2e2",
    fontSize: "10px",
    textAlign: "right",
  },
  rating: {
    alignItems: "center",
    display: "flex",
    gridColumn: "1 / 3",
    margin: "-4px",
    "& > *": {
      margin: "4px",
    },
  },
});

interface CheckInItemProps {
  article: Article;
  checkIn: CheckIn;
}

const CheckInItem: React.FC<CheckInItemProps> = ({ checkIn, article }) => {
  const classes = useStyles({ photoURL: article.data.photoURL });
  return (
    <div className={classes.checkIn}>
      <div className={classes.photo}></div>
      <div className={classes.meta}>
        <div className={classes.displayName}>{article.data.displayName}</div>
        <div className={classes.manufacturer}>{article.data.manufacturer}</div>
        <div className={classes.timestamp}>
          {checkIn.data.timestamp && (
            <PassedTime date={checkIn.data.timestamp} />
          )}
        </div>
        <div className={classes.rating}>
          {checkIn.data.rating && <Rating rating={checkIn.data.rating / 5} />}
        </div>
      </div>
    </div>
  );
};

export default CheckInItem;
