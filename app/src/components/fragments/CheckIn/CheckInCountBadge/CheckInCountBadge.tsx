import React from "react";
import Badge from "components/ui/icons/Badge";

function resolveBadgeType(count?: number) {
  if (count) {
    if (count > 10) {
      return "heart";
    } else if (count > 5) {
      return "diamond";
    }
  }
  return "badge";
}

interface CheckInItemProps {
  count: number;
}

const CheckInItem: React.FC<CheckInItemProps> = ({ count }) => {
  return <Badge type={resolveBadgeType(count)}>{count}</Badge>;
};

export default CheckInItem;
