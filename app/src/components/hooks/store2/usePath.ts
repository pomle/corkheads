import { useCallback } from "react";
import { firestore } from "firebase/app";

export function usePath(collection: firestore.CollectionReference) {
  return useCallback((id: string) => `${collection.path}/${id}`, [collection]);
}
