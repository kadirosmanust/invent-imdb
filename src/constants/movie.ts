export const MediaType = {
  ALL: "all",
  MOVIE: "movie",
  SERIES: "series",
  EPISODE: "episode",
} as const;

export type MediaTypeValues = (typeof MediaType)[keyof typeof MediaType];

export const MediaTypesOptions = Object.values(MediaType).map((m) => {
  return {
    label: m.charAt(0).toUpperCase() + m.slice(1),
    value: m,
  };
});
