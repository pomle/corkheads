import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import { ReactComponent as BellActiveIcon } from "assets/graphics/icons/notifications-bell-active.svg";
import { ReactComponent as BellInactiveIcon } from "assets/graphics/icons/notifications-bell-inactive.svg";
import { ReactComponent as Badge } from "assets/graphics/icons/notifications-circle.svg";

const useStyles = makeStyles((theme: Theme) => ({
  NotificationIcon: {
    position: "relative",
    "& > .icon": {
      "& svg": {
        display: "block",
        height: "24px",
        width: "24px",
      },
    },
    "& > .badge": {
      position: "absolute",
      right: -4,
      top: -6,
      "& svg": {
        display: "block",
        height: "18px",
        width: "18px",
      },
      "& > .count": {
        alignItems: "center",
        color: theme.color.surface,
        display: "flex",
        fontSize: "8px",
        height: "100%",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        width: "100%",
      },
    },
  },
}));

interface NotifictionIconProps {
  count: number;
}

const NotificationIcon: React.FC<NotifictionIconProps> = ({ count }) => {
  const classes = useStyles();
  return (
    <div className={classes.NotificationIcon}>
      <div className="icon">
        {count > 0 ? <BellActiveIcon /> : <BellInactiveIcon />}
      </div>
      {count > 0 && (
        <div className="badge">
          <Badge />
          <div className="count">{count > 99 ? "99+" : count}</div>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
