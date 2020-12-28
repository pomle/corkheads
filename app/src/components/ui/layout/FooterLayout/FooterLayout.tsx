import React from "react";
import BurgerLayout from "../BurgerLayout";

interface FooterLayoutProps {
  children: [React.ReactNode, React.ReactNode];
}

const FooterLayout: React.FC<FooterLayoutProps> = ({
  children: [content, footer],
}) => {
  return (
    <BurgerLayout>
      {null}
      {content}
      {footer}
    </BurgerLayout>
  );
};

export default FooterLayout;
