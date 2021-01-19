import React from "react";
import { makeStyles } from "@material-ui/styles";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Colors } from "components/ui/theme/colors";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import Reactions from "./components/Reactions/Reactions";
import { useMe } from "components/hooks/useMe";
import Comments from "./components/Comments";
import { Theme } from "components/ui/theme/themes";
import Summary from "./components/Summary";

const useStyles = makeStyles((theme: Theme) => ({
  summary: {
    padding: "16px",
  },
  score: {
    display: "flex",
    fontSize: "24px",
    justifyContent: "center",
    padding: "16px",
    "& .star.filled path": {
      fill: Colors.MarbleBlue,
    },
    "& .star.empty path": {
      fill: "none",
      stroke: Colors.MarbleBlue,
      strokeWidth: "4px",
    },
  },
  interactions: {
    background: Colors.White,
  },
  comment: {
    fontSize: "14px",
    fontWeight: 700,
  },
  reactions: {
    borderBottom: `dashed 1px ${Colors.Sky}`,
  },
  comments: {
    padding: "24px",
  },
}));

interface CheckInDetailsViewProps {
  nav: React.ReactNode;
  routes: {
    article: (articleId: string) => void;
    user: (userId: string) => void;
    picture: () => void;
  };
  checkInId: string;
}

const CheckInDetailsView: React.FC<CheckInDetailsViewProps> = ({
  nav,
  routes,
  checkInId,
}) => {
  const me = useMe()?.data;

  const classes = useStyles();

  return (
    <ThemeProvider theme="pure">
      <HeaderLayout>
        <ViewCap>
          {nav}
          <ViewTitle title="Check in" />
        </ViewCap>
        <ThemeProvider theme="sky">
          <ViewBody>
            <ThemeProvider theme="pure">
              <div className={classes.summary}>
                <Summary checkInId={checkInId} routes={routes} />
              </div>

              <div className={classes.interactions}>
                <div className={classes.reactions}>
                  {me && <Reactions checkInId={checkInId} userId={me.id} />}
                </div>
                <div className={classes.comments}>
                  <Comments checkInId={checkInId} routes={routes} />
                </div>
              </div>
            </ThemeProvider>
          </ViewBody>
        </ThemeProvider>
      </HeaderLayout>
    </ThemeProvider>
  );
};

export default CheckInDetailsView;
