import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridGap: 20,
    gridAutoFlow: "row",
  },
});

const ItemListCluster: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {React.Children.map(children, (child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  );
};

export default ItemListCluster;
