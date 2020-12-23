import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  NavIcon: {
    "& > svg": {
      display: "block",
      height: "24px",
      width: "24px",
    },
  },
}));

interface NavIconProps extends React.ButtonHTMLAttributes<unknown> {}

const NavIcon: React.FC<NavIconProps> = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <button className={classes.NavIcon} type="button" {...props}>
      {children}
    </button>
  );
};

export default NavIcon;
