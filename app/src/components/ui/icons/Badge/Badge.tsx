import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as BadgeIcon } from "assets/graphics/icons/badge.svg";
import { ReactComponent as DiamondIcon } from "assets/graphics/icons/diamond.svg";
import { ReactComponent as HeartIcon } from "assets/graphics/icons/heart.svg";

type Icon = "badge" | "diamond" | "heart";

const ICONS: Record<Icon, React.ReactNode> = {
  badge: BadgeIcon,
  diamond: DiamondIcon,
  heart: HeartIcon,
};

const useStyles = makeStyles({
  Badge: {},
});

interface BadgeProps {
  icon: Icon;
}

const Badge: React.FC<BadgeProps> = ({ children, icon }) => {
  const classes = useStyles();
  return (
    <div className={classes.Badge}>
      {ICONS[icon]}
      {children}
    </div>
  );
};

export default Badge;
