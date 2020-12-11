import React, { useMemo } from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { makeStyles } from "@material-ui/styles";
import Themer from "components/ui/theme/Themer";
import { Theme } from "components/ui/theme/themes";
import ViewHead from "components/ui/layout/ViewHead";
import ItemList from "components/ui/layout/ItemList";
import CheckInItem from "components/fragments/CheckIn/CheckInItem";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";
import { useContentCache } from "components/hooks/useContentCache";

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    textAlign: "center",
  },
  body: {
    margin: "0 16px",
  },
}));

interface UserCheckInsViewProps {
  nav: React.ReactNode;
  routes: {
    checkIn: (checkInId: string) => void;
  };
  userId: string;
}

const UserCheckInsView: React.FC<UserCheckInsViewProps> = ({
  nav,
  routes,
  userId,
}) => {
  const query = useMemo((): CheckInQuery => {
    return {
      filters: {
        userIds: [userId],
      },
      order: [
        {
          field: "timestamp",
          dir: "desc",
        },
      ],
      limit: 20,
    };
  }, [userId]);

  const result = useCheckInQuery(query);

  const classes = useStyles();

  return (
    <Themer theme="cream">
      <HeaderLayout>
        <ViewCap>
          {nav}
          <ViewHead>
            <div className={classes.head}>
              <h1>Latest Check ins</h1>
            </div>
          </ViewHead>
        </ViewCap>
        <ViewBody>
          <div className={classes.body}>
            {useContentCache(() => {
              if (!result) {
                return;
              }

              return (
                <ItemList>
                  {result.map(({ checkInEntry, articleEntry }) => {
                    const article = articleEntry.data;
                    const checkIn = checkInEntry.data;

                    return (
                      <button
                        key={checkInEntry.id}
                        onClick={() => routes.checkIn(checkInEntry.id)}
                      >
                        {article && (
                          <CheckInItem checkIn={checkIn} article={article} />
                        )}
                      </button>
                    );
                  })}
                </ItemList>
              );
            }, [result])}
          </div>
        </ViewBody>
      </HeaderLayout>
    </Themer>
  );
};

export default UserCheckInsView;
