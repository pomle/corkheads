import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/styles";
import ItemList from "components/ui/layout/ItemList";
import UserItem from "components/fragments/User/UserItem";
import {
  FollowingQuery,
  useFollowingQuery,
} from "components/hooks/db/useFollowingQuery";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewBody from "components/ui/layout/ViewBody";
import ViewCap from "components/ui/layout/ViewCap";
import ViewHead from "components/ui/layout/ViewHead";
import ThemeProvider from "components/ui/theme/ThemeProvider";

const useStyles = makeStyles({
  body: {
    margin: "16px",
  },
});

interface UserFriendsViewProps {
  userId: string;
  routes: {
    user: (userId: string) => void;
  };
  nav: React.ReactNode;
}

const UserFriendsView: React.FC<UserFriendsViewProps> = ({
  userId,
  routes,
  nav,
}) => {
  const query = useMemo((): FollowingQuery => {
    return {
      userId,
      order: [
        {
          field: "timestamp",
          dir: "desc",
        },
      ],
      limit: 100,
    };
  }, [userId]);

  const request = useFollowingQuery(query);

  const classes = useStyles();

  return (
    <ThemeProvider theme="pure">
      <HeaderLayout>
        <ViewCap>
          {nav}
          <ViewHead>
            <h1>Friends</h1>
          </ViewHead>
        </ViewCap>
        <ViewBody>
          <div className={classes.body}>
            <ItemList divided>
              {request.results.map((pointer) => {
                return (
                  <button
                    key={pointer.userId}
                    type="button"
                    onClick={() => routes.user(pointer.userId)}
                  >
                    <UserItem pointer={pointer} />
                  </button>
                );
              })}
            </ItemList>
          </div>
        </ViewBody>
      </HeaderLayout>
    </ThemeProvider>
  );
};

export default UserFriendsView;
