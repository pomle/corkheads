import React from "react";

interface NumberProps {
  value: number;
  decimals: number;
}

const Number: React.FC<NumberProps> = ({ value, decimals }) => {
  return <>{value.toFixed ? value.toFixed(decimals) : "–"}</>;
};

export default Number;
