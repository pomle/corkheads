import React from "react";
import { makeStyles } from "@material-ui/styles";
import HeaderLayout from "../HeaderLayout";

const useStyles = makeStyles({
  head: {
    background: "#FFF",
    borderBottom: "solid 1px #CCCCCC",
  },
  content: {
    background: "#FFF",
    height: "100%",
    overflow: "scroll",
  },
});

interface DialogLayoutProps {
  children: [React.ReactNode, React.ReactNode];
}

const DialogLayout: React.FC<DialogLayoutProps> = ({
  children: [head, content],
}) => {
  const classes = useStyles();

  return (
    <HeaderLayout>
      <div className={classes.head}>{head}</div>
      <div className={classes.content}>{content}</div>
    </HeaderLayout>
  );
};

export default DialogLayout;
