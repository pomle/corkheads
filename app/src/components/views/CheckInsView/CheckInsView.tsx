import React, { useMemo } from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { makeStyles } from "@material-ui/styles";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import { Theme } from "components/ui/theme/themes";
import ViewTitle from "components/ui/layout/ViewTitle";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";
import ViewportDetector from "components/ui/trigger/ViewportDetector";
import { useScrollSize } from "components/hooks/useScrollSize";
import { useMe } from "components/hooks/useMe";
import CheckInList from "components/fragments/CheckIn/CheckInList";

const useStyles = makeStyles((theme: Theme) => ({
  body: {
    margin: "16px",
  },
}));

const MAX_ITEMS = 100;

interface CheckInsViewProps {
  nav: React.ReactNode;
  routes: {
    checkIn: (checkInId: string) => void;
  };
  userId: string;
  filterUserIds?: string[];
}

const CheckInsView: React.FC<CheckInsViewProps> = ({
  nav,
  routes,
  filterUserIds,
}) => {
  const me = useMe();

  const [size, bump] = useScrollSize(10, MAX_ITEMS, 10);

  const query = useMemo((): CheckInQuery => {
    return {
      filters: {
        userIds: filterUserIds,
      },
      order: [
        {
          field: "timestamp",
          dir: "desc",
        },
      ],
      limit: MAX_ITEMS,
    };
  }, [filterUserIds]);

  const request = useCheckInQuery(query);

  let title = "Check ins";
  if (filterUserIds) {
    if (filterUserIds.length === 1 && filterUserIds[0] === me?.id) {
      title = "Your check ins";
    }
  } else if (filterUserIds === undefined) {
    title = "Recent check ins";
  }

  const pointers = useMemo(() => {
    return request.results.slice(0, size);
  }, [request.results, size]);

  const classes = useStyles();

  return (
    <ThemeProvider theme="pure">
      <HeaderLayout>
        <ViewCap>
          {nav}
          <ViewTitle title={title} />
        </ViewCap>
        <ViewBody>
          <div className={classes.body}>
            <CheckInList pointers={pointers} routes={routes} />
          </div>
          <ViewportDetector onEnter={bump} />
        </ViewBody>
      </HeaderLayout>
    </ThemeProvider>
  );
};

export default CheckInsView;
