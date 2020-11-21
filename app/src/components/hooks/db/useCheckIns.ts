import { useFlatResult, useStore } from "components/hooks/createStoreHook";
import { CheckIn } from "types/CheckIn";
import { useCollection } from "./useCollection";

export function useCheckIns(articleIds: string[]) {
  return useStore<CheckIn>(useCollection().checkIn, articleIds);
}

export function useCheckIn(checkInId: string) {
  const result = useCheckIns([checkInId]);
  return useFlatResult(checkInId, result);
}
