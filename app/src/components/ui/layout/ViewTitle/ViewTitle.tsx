import React from "react";
import { makeStyles } from "@material-ui/styles";
import ViewHead from "components/ui/layout/ViewHead";

const useStyles = makeStyles({
  ViewTitle: {
    marginTop: "-24px",
    padding: "0 24px",
    textAlign: "center",
  },
});

interface ViewTitleProps {
  title: React.ReactNode;
}

const ViewTitle: React.FC<ViewTitleProps> = ({ title }) => {
  const classes = useStyles();

  return (
    <ViewHead>
      <h1 className={classes.ViewTitle}>{title}</h1>
    </ViewHead>
  );
};

export default ViewTitle;
