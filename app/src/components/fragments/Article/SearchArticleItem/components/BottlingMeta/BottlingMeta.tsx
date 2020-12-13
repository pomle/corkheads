import { asABV } from "lib/format/stringify";
import React from "react";
import { Bottling } from "types/Bottling";

function interleave(parts: React.ReactElement[], sep: React.ReactFragment) {
  const output: React.ReactElement[] = [];
  for (let i = 0; i < parts.length; i += 1) {
    output.push(parts[i]);
    if (parts[i + 1]) {
      output.push(<React.Fragment key={`sep-${i}`}>{sep}</React.Fragment>);
    }
  }
  return output;
}

const Age: React.FC<{ years: number }> = ({ years }) => {
  return <>{years} years</>;
};

const ABV: React.FC<{ percent: number }> = ({ percent }) => {
  return <>{asABV(percent)}</>;
};

const Year: React.FC<{ year: number }> = ({ year }) => {
  return <>{year}</>;
};

interface BottlingMetaProps {
  bottling: Partial<Bottling>;
}

const BottlingMeta: React.FC<BottlingMetaProps> = ({ bottling }) => {
  const parts: React.ReactElement[] = [];
  if (bottling?.year) {
    parts.push(<Year key="year" year={bottling.year} />);
  }

  const distill = bottling.distill;
  if (distill?.age) {
    parts.push(<Age key="distill-age" years={distill.age} />);
  }

  if (distill?.alcoholByVolumePercentage) {
    parts.push(<ABV key="abv" percent={distill.alcoholByVolumePercentage} />);
  }

  return <>{interleave(parts, " – ")}</>;
};

export default BottlingMeta;
