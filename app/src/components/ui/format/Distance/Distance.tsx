import React from "react";

interface DistanceProps {
  meters: number;
}

const Distance: React.FC<DistanceProps> = ({ meters }) => {
  return <>{(meters / 1000).toFixed()} km</>;
};

export default Distance;
