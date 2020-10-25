import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as ArrowOut } from "assets/graphics/icons/arrow-forward.svg";

const disabled = ({ disabled }: DetailArrowItemProps) => {
  if (disabled) {
    return "grey";
  }
  return "black";
};

const useStyles = makeStyles({
  information: {
    display: "grid",
    gridAutoFlow: "column",
    gridGap: 20,
    paddingLeft: 20
  },
  arrow: {
    paddingRight: 10,
    paddingTop: 10,
    fill: disabled
  }
});

interface DetailArrowItemProps {
  primary: React.ReactNode;
  secondary: React.ReactNode;
  disabled: boolean;
}

const DetailArrowItem: React.FC<DetailArrowItemProps> = ({
  primary,
  secondary,
  disabled
}) => {
  const classes = useStyles({ primary, secondary, disabled });
  return (
    <div className={classes.information}>
      {primary}
      <ArrowOut className={classes.arrow} />
      {secondary}
    </div>
  );
};

export default DetailArrowItem;
