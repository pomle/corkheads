import { useSingle, useStore } from "components/hooks/store2/useStore";
import { Image } from "types/Image";
import { useCollection } from "./useCollection";

export function useImages(imageIds: string[]) {
  return useStore<Image>(useCollection().image, imageIds);
}

export function useImage(imageId?: string) {
  return useSingle(useImages(imageId ? [imageId] : []), imageId);
}
