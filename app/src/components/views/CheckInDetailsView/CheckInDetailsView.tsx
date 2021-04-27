import React from "react";
import { makeStyles } from "@material-ui/styles";
import NavigationBar, { Nav } from "components/ui/layout/NavigationBar";
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
import {
  createPath,
  useBack,
  useScreen,
} from "components/context/ScreenContext";
import { useCheckIn } from "components/hooks/db/useCheckIns";
import { createCheckIn } from "types/CheckIn";
import UserView from "../UserView";
import { SlideRight } from "components/ui/transitions/Slide";
import BackButton from "components/ui/trigger/BackButton";

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

const userPath = createPath("/user");

interface CheckInDetailsViewProps {
  checkInId: string;
}

const CheckInDetailsView: React.FC<CheckInDetailsViewProps> = ({
  checkInId,
}) => {
  const me = useMe()?.data;

  const checkIn = useCheckIn(checkInId)?.data || createCheckIn(checkInId);

  const goBack = useBack();

  const goToUser = useScreen({
    path: userPath,
    render: () => <>{checkIn ? <UserView userId={checkIn.userId} /> : null}</>,
    transition: SlideRight,
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme="pure">
      <HeaderLayout>
        <ViewCap>
          <NavigationBar nav={{ back: <BackButton onClick={goBack} /> }}>
            <ViewTitle title="Check in" />
          </NavigationBar>
        </ViewCap>
        <ThemeProvider theme="sky">
          <ViewBody>
            <ThemeProvider theme="pure">
              <div className={classes.summary}>
                <Summary checkInId={checkInId} toUser={goToUser} />
              </div>

              <div className={classes.interactions}>
                <div className={classes.reactions}>
                  {me && <Reactions checkInId={checkInId} userId={me.id} />}
                </div>
                <div className={classes.comments}>
                  <Comments checkInId={checkInId} toUser={goToUser} />
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
