import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Article, CheckIn } from "types/types";
import Badge from "components/ui/typography/Badge";
import Rating from "components/ui/indicators/Rating";

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
    gridAutoFlow: "row",
    gridGap: "4px",
    flex: "1",
    lineHeight: 1.4,
    padding: "14px 16px",
  },
  displayName: {
    fontSize: "17px",
    fontWeight: 700,
  },
  manufacturer: {
    fontSize: "12px",
    fontWeight: 500,
  },
  rating: {
    alignItems: "center",
    display: "flex",
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
        <div>
          <div className={classes.displayName}>{article.data.displayName}</div>
          <div className={classes.manufacturer}>
            {article.data.manufacturer}
          </div>
        </div>
        <div className={classes.rating}>
          <Badge>4 Check Ins</Badge>
          {checkIn.data.rating && <Rating rating={checkIn.data.rating / 5} />}
        </div>
      </div>
    </div>
  );
};

export default CheckInItem;
