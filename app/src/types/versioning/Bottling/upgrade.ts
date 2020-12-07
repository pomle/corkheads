import { Bottling, createBottling } from "types/Bottling";
import { upgrade as upgradeDistill } from "../Distill/upgrade";
import { isObject } from "../identify";

export function upgrade(source: unknown): Bottling {
  if (isObject(source)) {
    let output = { ...source } as any;

    if ("distill" in output) {
      output.distill = upgradeDistill(output.distill);
    }

    return output as Bottling;
  }

  return createBottling();
}
