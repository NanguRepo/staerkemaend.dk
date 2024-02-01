export interface image {
  src: string;
  id: number;
  tags: string[];
  time: number;
}

export interface tag {
  count: number;
  name: string;
}
