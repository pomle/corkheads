import React, { useMemo } from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { makeStyles } from "@material-ui/styles";
import Themer from "components/ui/theme/Themer";
import { Theme } from "components/ui/theme/themes";
import ViewHead from "components/ui/layout/ViewHead";
import ItemList from "components/ui/layout/ItemList";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";
import ViewportDetector from "components/ui/trigger/ViewportDetector";
import { useScrollSize } from "components/hooks/useScrollSize";
import CheckInItemButton from "components/fragments/CheckIn/CheckInItem/Button";
import { useMe } from "components/hooks/useMe";

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
      limit: Math.min(size + 20, MAX_ITEMS),
    };
  }, [filterUserIds, size]);

  const request = useCheckInQuery(query);

  let title = "Check ins";
  if (filterUserIds) {
    if (filterUserIds.length === 1 && filterUserIds[0] === me?.id) {
      title = "Your check ins";
    }
  } else if (filterUserIds === undefined) {
    title = "Recent check ins";
  }

  const classes = useStyles();

  return (
    <Themer theme="pure">
      <HeaderLayout>
        <ViewCap>
          {nav}
          <ViewHead>
            <h1>{title}</h1>
          </ViewHead>
        </ViewCap>
        <ViewBody>
          <div className={classes.body}>
            <ItemList divided>
              {request.results.slice(0, size).map((pointer) => {
                return (
                  <CheckInItemButton
                    key={pointer.checkInId}
                    pointer={pointer}
                    route={routes.checkIn}
                  />
                );
              })}
            </ItemList>
          </div>
          <ViewportDetector onEnter={bump} />
        </ViewBody>
      </HeaderLayout>
    </Themer>
  );
};

export default CheckInsView;
