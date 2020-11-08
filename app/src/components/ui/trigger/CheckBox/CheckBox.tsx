import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as CheckMark } from "assets/graphics/icons/checkmark.svg";

const COLOR_GREY = "#EAEAEA";
const COLOR_GREEN = "#5ADC9B";
const COLOR_GREEN_FADED = "#5ADC9B80";
const COLOR_PURPLE = "#A84398";
const COLOR_NONE = "transparent";

interface CheckBoxProps {
  checked?: boolean;
  disabled?: boolean;
}

const setBorderColor = ({ checked, disabled }: CheckBoxProps) => {
  if (disabled && checked) {
    return COLOR_NONE;
  }

  if (disabled) {
    return COLOR_GREY;
  }

  if (checked) {
    return COLOR_NONE;
  }

  return COLOR_PURPLE;
};

const setBackgroundColor = ({ checked, disabled }: CheckBoxProps) => {
  if (disabled && checked) {
    return COLOR_GREEN_FADED;
  }

  if (checked) {
    return COLOR_GREEN;
  }

  return COLOR_NONE;
};

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    backgroundColor: setBackgroundColor,
    border: "2px solid",
    borderColor: setBorderColor,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    padding: 0,
    height: 20,
    width: 20,
    "& svg": {
      height: 8.9,
      width: 9.3,
    },
  },
});

const CheckBox: React.FC<CheckBoxProps> = ({ checked, disabled }) => {
  const classes = useStyles({ checked, disabled });

  return <div className={classes.root}>{checked && <CheckMark />}</div>;
};

export default CheckBox;
