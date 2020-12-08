import { TransitionEffectProps } from "./types";

export function pointerEvents(props: TransitionEffectProps) {
  return props.active ? "all" : "none";
}
