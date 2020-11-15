import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Article } from "types/article";
import { CheckIn } from "types/checkIn";
import Rating from "components/ui/indicators/Rating";
import PassedTime from "components/ui/format/PassedTime";
import ImageItem from "components/ui/layout/ImageItem";

const useStyles = makeStyles({
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
  const { photoURL } = article.data;

  const classes = useStyles();

  return (
    <ImageItem
      image={photoURL && <img src={photoURL} alt={article.data.displayName} />}
    >
      <div className={classes.displayName}>{article.data.displayName}</div>
      <div className={classes.manufacturer}>{article.data.manufacturer}</div>
      <div className={classes.timestamp}>
        {checkIn.data.timestamp && <PassedTime date={checkIn.data.timestamp} />}
      </div>
      <div className={classes.rating}>
        {checkIn.data.rating && <Rating rating={checkIn.data.rating / 5} />}
      </div>
    </ImageItem>
  );
};

export default CheckInItem;
