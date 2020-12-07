import { Distill } from "types/Bottling";
import { isObject } from "../identify";

export function upgrade(source: unknown): Distill {
  if (isObject(source)) {
    let output = { ...source } as any;

    if ("alcoholByVolumeFraction" in output) {
      if (!("alcoholByVolumePercentage" in output)) {
        output.alcoholByVolumePercentage = output.alcoholByVolumeFraction * 100;
      }
      delete output.alcoholByVolumeFraction;
    }

    return output as Distill;
  }

  return {
    distillery: {},
  };
}
