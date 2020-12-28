import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  BurgerLayout: {
    display: "flex",
    flexFlow: "column",
    height: "100%",
    pointerEvents: "all",
    "& > header": {
      flex: "0 1",
    },
    "& > main": {
      flex: "auto",
      height: "100%",
      overflow: "hidden",
      "& > *": {
        height: "100%",
      },
    },
    "& > footer": {
      flex: "0 1",
    },
  },
});

interface BurgerLayoutProps {
  children: [React.ReactNode, React.ReactNode, React.ReactNode];
}

const BurgerLayout: React.FC<BurgerLayoutProps> = ({
  children: [header, content, footer],
}) => {
  const classes = useStyles();

  return (
    <div className={classes.BurgerLayout}>
      <header>{header}</header>
      <main>{content}</main>
      <footer>{footer}</footer>
    </div>
  );
};

export default BurgerLayout;
