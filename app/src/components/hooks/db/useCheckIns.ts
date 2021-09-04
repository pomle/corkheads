import { useCollectionResult } from "@pomle/react-firebase";
import { CheckIn } from "types/CheckIn";
import { useSingle } from "./helpers/useSingle";
import { useCollection } from "./useCollection";

export function useCheckIns(checkInIds: string[]) {
  return useCollectionResult<CheckIn>(useCollection().checkIn, checkInIds);
}

export function useCheckIn(checkInId?: string) {
  return useSingle(useCheckIns(checkInId ? [checkInId] : []), checkInId);
}
