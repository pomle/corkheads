import React from "react";
import { ReactComponent as ArrowBack } from "assets/graphics/icons/arrow-nav-back.svg";
import NavButton from "../NavButton";

const BackButton: React.FC<React.ButtonHTMLAttributes<unknown>> = ({
  children,
  ...props
}) => {
  return <NavButton {...props} icon={<ArrowBack />} />;
};

export default BackButton;
