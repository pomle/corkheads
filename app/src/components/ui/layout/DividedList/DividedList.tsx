import React, { Children } from "react";
import Divider from "components/ui/layout/Divider";

const DividedList: React.FC = ({ children }) => {
  return (
    <>
      {Children.map(children, (child, index) => {
        return (
          <>
            {index > 0 && <Divider />}
            {child}
          </>
        );
      })}
    </>
  );
};

export default DividedList;
