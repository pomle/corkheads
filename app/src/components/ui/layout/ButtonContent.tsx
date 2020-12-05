import React from "react";
import { makeStyles } from "@material-ui/styles";
import LineThrobber from "components/ui/throbbers/LineThrobber";

const useStyles = makeStyles({
  busy: {
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
  },
});

interface ButtonContentProps {
  busy?: boolean;
}

const ButtonContent: React.FC<ButtonContentProps> = ({
  children,
  busy = false,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className="content">{children}</div>
      {busy && (
        <div className={classes.busy}>
          <LineThrobber color="#fff4" />
        </div>
      )}
    </>
  );
};

export default ButtonContent;
