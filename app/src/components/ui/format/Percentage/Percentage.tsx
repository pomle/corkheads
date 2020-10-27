import React from "react";

interface PercentageProps {
  fraction: number;
}

const Percentage: React.FC<PercentageProps> = ({ fraction }) => {
  if (isFinite(fraction)) {
    return <>{(fraction * 100).toFixed()}%</>;
  }
  return <>-</>;
};

export default Percentage;
