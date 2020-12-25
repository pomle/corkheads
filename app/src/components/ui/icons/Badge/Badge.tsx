import React from "react";
import { makeStyles } from "@material-ui/styles";
import BadgeIcon from "assets/graphics/icons/badge.svg";
import DiamondIcon from "assets/graphics/icons/diamond.svg";
import HeartIcon from "assets/graphics/icons/heart.svg";
import { Colors } from "components/ui/theme/themes";

type Type = "badge" | "diamond" | "heart";

const ICONS: Record<Type, React.ReactNode> = {
  badge: BadgeIcon,
  diamond: DiamondIcon,
  heart: HeartIcon,
};

const COLORS: Record<Type, string> = {
  badge: Colors.X1,
  diamond: Colors.ShinyGold,
  heart: Colors.Hearty,
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
    position: "relative",
    textAlign: "center",
    width: "24px",
  },
});

interface BadgeProps {
  type?: Type;
}

const Badge: React.FC<BadgeProps> = ({ children, type = "badge" }) => {
  let size = 12;
  if (typeof children === "number" || typeof children === "string") {
    const length = children.toString().length;
    if (length > 3) {
      size = 8;
    } else if (length > 2) {
      size = 10;
    }
  }

  const classes = useStyles({ type, size });
  return <div className={classes.Badge}>{children}</div>;
};

export default Badge;