import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  field: {
    border: "none",
    margin: 0,
    padding: 0,
    "& legend": {
      color: "#999999",
      fontSize: 12,
      margin: "4px 0",
      padding: 0
    },
    "& input": {
      border: "none",
      borderBottom: "1px solid #EAEAEA",
      borderRadius: 0,
      fontSize: 16,
      margin: "4px -10px",
      padding: "6px 10px",
      width: "100%"
    }
  }
});

interface FieldProps {
  legend: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ legend, children }) => {
  const classes = useStyles();

  return (
    <fieldset className={classes.field}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
};

export default Field;
