import { useSingle, useStore } from "components/hooks/store2/useStore";
import { CheckIn } from "types/CheckIn";
import { useCollection } from "./useCollection";

export function useCheckIns(checkInIds: string[]) {
  return useStore<CheckIn>(useCollection().checkIn, checkInIds);
}

export function useCheckIn(checkInId?: string) {
  return useSingle(useCheckIns(checkInId ? [checkInId] : []), checkInId);
}
