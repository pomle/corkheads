import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors, Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  NavButton: {
    alignItems: "center",
    color: theme.color.action,
    display: "flex",
    fontSize: "14px",
    fontWeight: () => {
      if (theme.color.action === Colors.MatteGold) {
        return 400;
      }
      return 500;
    },
  },
  icon: {
    marginRight: 5,
    "& > svg": {
      display: "block",
      height: "10px",
      width: "10px",
      "& > path": {
        fill: theme.color.text,
      },
    },
  },
}));

interface NavButtonProps extends React.ButtonHTMLAttributes<unknown> {
  icon: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ children, icon, ...props }) => {
  const classes = useStyles();

  return (
    <button className={classes.NavButton} type="button" {...props}>
      <div className={classes.icon}>{icon}</div>
      {children}
    </button>
  );
};

export default NavButton;
