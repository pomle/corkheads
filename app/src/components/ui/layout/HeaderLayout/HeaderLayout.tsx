import React from "react";
import BurgerLayout from "../BurgerLayout";

interface HeaderLayoutProps {
  children: [React.ReactNode, React.ReactNode];
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  children: [header, content],
}) => {
  return (
    <BurgerLayout>
      {header}
      {content}
      {null}
    </BurgerLayout>
  );
};

export default HeaderLayout;
