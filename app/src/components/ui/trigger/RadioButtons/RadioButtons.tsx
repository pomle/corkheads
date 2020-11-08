import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "grid",
    gridAutoFlow: "column",
    justifyItems: "spread",
  },
});

interface RadioButtonsProps<T> {
  value: T;
  onChange: (value: T) => void;
}

const RadioButtons: React.FC<RadioButtonsProps<any>> = ({
  children,
  value: selectedValue,
  onChange,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {React.Children.map(children, (child, index) => {
        const element = child as React.ReactElement;
        const { value } = element.props;
        return (
          <button type="button" key={index} onClick={() => onChange(value)}>
            {React.cloneElement(element, { selected: selectedValue === value })}
          </button>
        );
      })}
    </div>
  );
};

export default RadioButtons;
