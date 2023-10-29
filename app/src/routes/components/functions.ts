export const createColumns = (
  images: string[],
): Record<string, Record<string, string>[]> => {
  return {
    left: images.filter((_, index) => {
      return index % 2 == 0;
    }),
    right: images.filter((_, index) => {
      return index % 2 != 0;
    }),
  };
};
