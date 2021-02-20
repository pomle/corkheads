import React from "react";
import { makeStyles } from "@material-ui/styles";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import ViewTitle from "components/ui/layout/ViewTitle";
import NavigationBar, { Nav } from "components/ui/layout/NavigationBar";

const useStyles = makeStyles({
  body: {
    padding: "16px",
  },
});

interface HeaderPageLayoutProps {
  nav: Nav;
  title: React.ReactNode;
}

const HeaderPageLayout: React.FC<HeaderPageLayoutProps> = ({
  nav,
  title,
  children,
}) => {
  const classes = useStyles();

  return (
    <HeaderLayout>
      <ViewCap>
        <NavigationBar nav={nav}>
          <ViewTitle title={title} />
        </NavigationBar>
      </ViewCap>
      <ViewBody>
        <div className={classes.body}>{children}</div>
      </ViewBody>
    </HeaderLayout>
  );
};

export default HeaderPageLayout;
