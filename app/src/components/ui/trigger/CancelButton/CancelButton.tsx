import React from "react";
import { ReactComponent as CancelIcon } from "assets/graphics/icons/cancel.svg";
import NavButton from "../NavButton";

const CancelButton: React.FC<React.ButtonHTMLAttributes<unknown>> = ({
  children,
  ...props
}) => {
  return <NavButton {...props} icon={<CancelIcon />} />;
};

export default CancelButton;
