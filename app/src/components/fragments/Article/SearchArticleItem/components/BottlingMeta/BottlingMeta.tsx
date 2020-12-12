import React from "react";
import { Bottling } from "types/Bottling";

function interleave(parts: React.ReactElement[], sep: React.ReactElement) {
  const output: React.ReactElement[] = [];
  for (let i = 0; i < parts.length; i += 1) {
    output.push(parts[i]);
    if (parts[i + 1]) {
      output.push(sep);
    }
  }
  return output;
}

interface BottlingMetaProps {
  bottling: Partial<Bottling>;
}

const BottlingMeta: React.FC<BottlingMetaProps> = ({ bottling }) => {
  const parts: React.ReactElement[] = [];
  if (bottling?.year) {
    parts.push(<>{bottling.year}</>);
  }

  const distill = bottling.distill;
  if (distill?.age) {
    parts.push(<>{distill.age} years</>);
  }

  if (distill?.alcoholByVolumePercentage) {
    parts.push(<>{distill.alcoholByVolumePercentage}%</>);
  }

  return <>{interleave(parts, <> – </>)}</>;
};

export default BottlingMeta;
