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
import { useContentCache } from "components/hooks/useContentCache";
import ViewportDetector from "components/ui/trigger/ViewportDetector";
import { useScrollSize } from "components/hooks/useScrollSize";
import CheckInsViewItem from "./components/CheckInsViewItem";
import { createCheckIn } from "types/CheckIn";

const useStyles = makeStyles((theme: Theme) => ({
  body: {
    margin: "16px",
  },
}));

const Item = React.memo(CheckInsViewItem);

const MAX_ITEMS = 100;

interface CheckInsViewProps {
  nav: React.ReactNode;
  routes: {
    checkIn: (checkInId: string) => void;
  };
  userId: string;
}

const CheckInsView: React.FC<CheckInsViewProps> = ({ nav, routes }) => {
  const [size, bump] = useScrollSize(10, MAX_ITEMS, 10);

  const query = useMemo((): CheckInQuery => {
    return {
      filters: {},
      order: [
        {
          field: "timestamp",
          dir: "desc",
        },
      ],
      limit: Math.min(size + 20, MAX_ITEMS),
    };
  }, [size]);

  const request = useCheckInQuery(query);

  const items = useMemo(() => {
    return Array.from(request.results.values());
  }, [request.results]);

  const classes = useStyles();

  return (
    <Themer theme="pure">
      <HeaderLayout>
        <ViewCap>
          {nav}
          <ViewHead>
            <h1>Community Check ins</h1>
          </ViewHead>
        </ViewCap>
        <ViewBody>
          <div className={classes.body}>
            {useContentCache(() => {
              if (request.busy) {
                return;
              }

              return (
                <ItemList divided>
                  {items
                    .slice(0, size)
                    .map(({ articleEntry, checkInEntry }) => {
                      return (
                        <Item
                          key={checkInEntry.id}
                          checkIn={
                            checkInEntry.data || createCheckIn(checkInEntry.id)
                          }
                          article={articleEntry.data}
                          onClick={routes.checkIn}
                        />
                      );
                    })}
                </ItemList>
              );
            }, [items, size])}
          </div>
          <ViewportDetector onEnter={bump} />
        </ViewBody>
      </HeaderLayout>
    </Themer>
  );
};

export default CheckInsView;