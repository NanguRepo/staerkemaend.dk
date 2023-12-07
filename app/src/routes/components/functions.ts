import type { image, tag } from "./types";
import axios from "axios";
import { images, tags } from "./stores";
import { get } from "svelte/store";

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
  if (get(images).length) {
    return get(images);
  }
  const response = await axios.get(
    "https://api.pege.io/v2/staerkemaend/getImages",
  );
  images.set(response.data);
  return response.data;
};

export const getTags = async (): Promise<tag[]> => {
  if (get(tags).length) {
    return get(tags);
  }
  const response = await axios.get(
    "https://api.pege.io/v2/staerkemaend/getTags",
  );
  tags.set(response.data);
  return response.data;
};

export const getImage = async (id: number): Promise<image> => {
  const imageCache = get(images).find((object) => object.id == id);
  if (imageCache) {
    return imageCache;
  }
  const response = await axios.post(
    "https://api.pege.io/v2/staerkemaend/getImage",
    {
      id: id,
    },
  );
  return response.data;
};

export const searchImage = async (tags: tag[]): Promise<image[]> => {
  const response = await axios.post(
    "https://api.pege.io/v2/staerkemaend/searchImage",
    {
      tags: tags.map((tag) => tag.name),
    },
  );
  return response.data;
};
