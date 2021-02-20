import React, { useMemo } from "react";
import { Nav } from "components/ui/layout/NavigationBar";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import {
  CheckInQuery,
  useCheckInQuery,
} from "components/hooks/db/useCheckInQuery";
import ViewportDetector from "components/ui/trigger/ViewportDetector";
import { useScrollSize } from "components/hooks/useScrollSize";
import { useMe } from "components/hooks/useMe";
import CheckInList from "components/fragments/CheckIn/CheckInList";
import HeaderPageLayout from "components/ui/layout/HeaderPageLayout";

const MAX_ITEMS = 100;

interface CheckInsViewProps {
  nav: Nav;
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

  return (
    <ThemeProvider theme="pure">
      <HeaderPageLayout nav={nav} title={title}>
        <CheckInList pointers={pointers} routes={routes} />
        <ViewportDetector onEnter={bump} />
      </HeaderPageLayout>
    </ThemeProvider>
  );
};

export default CheckInsView;
