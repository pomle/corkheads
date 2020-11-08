import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import { ReactComponent as ArrowBack } from "assets/graphics/icons/arrow-nav-back.svg";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "flex",
    fontSize: 17,
  },
  icon: {
    marginRight: 5,
    "& > svg": {
      display: "block",
    },
  },
});

interface BackButtonProps {
  onClick?: () => void;
  to?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  to: path,
  children,
}) => {
  const classes = useStyles();

  const history = useHistory();
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
    if (path) {
      history.push(path);
    }
  }, [history, path, onClick]);

  return (
    <button type="button" onClick={handleClick} className={classes.root}>
      <div className={classes.icon}>
        <ArrowBack />
      </div>
      {children}
    </button>
  );
};

export default BackButton;
