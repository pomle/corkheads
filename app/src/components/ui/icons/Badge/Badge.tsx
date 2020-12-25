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
    fontSize: "14px",
    fontWeight: 700,
    justifyContent: "center",
    height: "2em",
    position: "relative",
    textAlign: "center",
    width: "2em",
  },
});

interface BadgeProps {
  type?: Type;
}

const Badge: React.FC<BadgeProps> = ({ children, type = "badge" }) => {
  const classes = useStyles({ type });
  return <div className={classes.Badge}>{children}</div>;
};

export default Badge;
