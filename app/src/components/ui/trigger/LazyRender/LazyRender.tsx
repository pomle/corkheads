import React, { useState } from "react";
import ViewportDetector from "../ViewportDetector";

interface LazyRenderProps {
  children: () => React.ReactElement;
}

const LazyRender: React.FC<LazyRenderProps> = ({ children: render }) => {
  const [active, setActive] = useState<boolean>(false);

  if (active) {
    return render();
  }

  return <ViewportDetector onEnter={() => setActive(true)} />;
};

export default LazyRender;
