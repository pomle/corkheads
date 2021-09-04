import { useCollectionResult } from "@pomle/react-firebase";
import { Image } from "types/Image";
import { useSingle } from "./helpers/useSingle";
import { useCollection } from "./useCollection";

export function useImages(imageIds: string[]) {
  return useCollectionResult<Image>(useCollection().image, imageIds);
}

export function useImage(imageId?: string) {
  return useSingle(useImages(imageId ? [imageId] : []), imageId);
}
