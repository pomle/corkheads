import React from "react";
import { makeStyles } from "@material-ui/styles";
import ViewHead from "components/ui/layout/ViewHead";

const useStyles = makeStyles({
  content: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
});

interface ViewTitleProps {
  title: React.ReactNode;
  next?: React.ReactNode;
}

const ViewTitle: React.FC<ViewTitleProps> = ({ title, next }) => {
  const classes = useStyles();

  return (
    <ViewHead>
      <div className={classes.content}>
        <h1>{title}</h1>

        {next}
      </div>
    </ViewHead>
  );
};

export default ViewTitle;
