import type { image } from "./types";
import axios from "axios";
export const createColumns = (images: image[]): Record<string, image[]> => {
  return {
    left: images.filter((_, index) => {
      return index % 2 == 0;
    }),
    right: images.filter((_, index) => {
      return index % 2 != 0;
    }),
  };
};

export const getImages = async (): Promise<image[]> => {
  const response = await axios.get(
    "https://api.nangu.dev/v2/staerkemaend/getImages",
  );
  return response.data;
};

export const getImage = async (id: number): Promise<image> => {
  const response = await axios.post(
    "https://api.nangu.dev/v2/staerkemaend/getImage",
    {
      id: id,
    },
  );
  return response.data;
};
