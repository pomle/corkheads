import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  AreaButton: {
    display: "block",
    height: "100%",
    width: "100%",
  },
});

interface AreaButtonProps extends React.ButtonHTMLAttributes<any> {}

const AreaButton: React.FC<AreaButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const classes = useStyles();

  return (
    <button
      className={`${classes.AreaButton} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default AreaButton;
