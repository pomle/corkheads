import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  ViewTitle: {
    color: theme.color.title,
    fontSize: "20px",
    lineHeight: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

interface ViewTitleProps {
  title: React.ReactNode;
}

const ViewTitle: React.FC<ViewTitleProps> = ({ title }) => {
  const classes = useStyles();

  return <h1 className={classes.ViewTitle}>{title}</h1>;
};

export default ViewTitle;
