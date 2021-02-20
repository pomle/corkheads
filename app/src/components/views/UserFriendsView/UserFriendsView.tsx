import React, { useMemo } from "react";
import { Nav } from "components/ui/layout/NavigationBar";
import ItemList from "components/ui/layout/ItemList";
import UserItem from "components/fragments/User/UserItem";
import {
  FollowingQuery,
  useFollowingQuery,
} from "components/hooks/db/useFollowingQuery";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import HeaderPageLayout from "components/ui/layout/HeaderPageLayout";

interface UserFriendsViewProps {
  userId: string;
  routes: {
    user: (userId: string) => void;
  };
  nav: Nav;
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

  return (
    <ThemeProvider theme="pure">
      <HeaderPageLayout nav={nav} title="Friends">
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
      </HeaderPageLayout>
    </ThemeProvider>
  );
};

export default UserFriendsView;
