import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
  NameValue: {
    display: "flex",
    fontSize: "14px",
    justifyContent: "space-between",
    padding: "12px 20px",
  },
});

interface NameValueProps {
  name: React.ReactNode;
  value: React.ReactNode;
}

const NameValue: React.FC<NameValueProps> = ({ name, value }) => {
  const classes = useStyles();
  return (
    <div className={classes.NameValue}>
      <div>{name}</div>
      <div>{value}</div>
    </div>
  );
};

export default NameValue;
