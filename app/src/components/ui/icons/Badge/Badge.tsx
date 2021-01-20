import React from "react";
import { makeStyles } from "@material-ui/styles";
import BadgeIcon from "assets/graphics/icons/badge.svg";
import DiamondIcon from "assets/graphics/icons/diamond.svg";
import HeartIcon from "assets/graphics/icons/heart.svg";
import RectIcon from "assets/graphics/icons/check-in-rectangle.svg";
import { Colors } from "components/ui/theme/colors";

type Type = "badge" | "diamond" | "heart" | "rect";

const ICONS: Record<Type, React.ReactNode> = {
  badge: BadgeIcon,
  diamond: DiamondIcon,
  heart: HeartIcon,
  rect: RectIcon,
};

const COLORS: Record<Type, string> = {
  badge: Colors.X1,
  diamond: Colors.ShinyGold,
  heart: Colors.Hearty,
  rect: Colors.White,
};

type StyleProps = {
  type: Type;
  size: number;
};

const useStyles = makeStyles({
  Badge: {
    alignItems: "center",
    backgroundImage: (props: StyleProps) => `url(${ICONS[props.type]})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    color: (props: StyleProps) => COLORS[props.type],
    display: "flex",
    fontFamily: "Roboto",
    fontSize: (props: StyleProps) => `${props.size}px`,
    fontWeight: 700,
    justifyContent: "center",
    height: "24px",
    width: "24px",
  },
});

interface BadgeProps {
  type?: Type;
}

const Badge: React.FC<BadgeProps> = ({ children, type = "badge" }) => {
  let size = 11;
  if (typeof children === "number" || typeof children === "string") {
    const length = children.toString().length;
    if (length > 3) {
      size = 7;
    } else if (length > 2) {
      size = 9;
    }
  }

  const classes = useStyles({ type, size });
  return <div className={classes.Badge}>{children}</div>;
};

export default Badge;
