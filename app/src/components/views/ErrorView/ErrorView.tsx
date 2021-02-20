import React from "react";
import { makeStyles } from "@material-ui/styles";
import NavigationBar, { Nav } from "components/ui/layout/NavigationBar";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import * as Locale from "./locales";

const useStyles = makeStyles({
  body: {
    margin: 24,
    "& h3": {
      color: "#BBB",
      margin: "32px",
      textAlign: "center",
    },
    "& p": {
      color: "#ed3030",
      lineHeight: 1.4,
      textAlign: "center",
    },
  },
});

interface ErrorViewProps {
  nav: Nav;
}

const ErrorView: React.FC<ErrorViewProps> = ({ nav, children }) => {
  const classes = useStyles();

  return (
    <HeaderLayout>
      <ViewCap>
        <NavigationBar nav={nav} />
      </ViewCap>
      <ViewBody>
        <div className={classes.body}>
          <h3>
            <Locale.Error />
          </h3>
          <p>{children}</p>
        </div>
      </ViewBody>
    </HeaderLayout>
  );
};

export default ErrorView;
