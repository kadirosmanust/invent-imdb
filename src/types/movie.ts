export type MovieListRequest = {
  page?: number;
  searchText?: string;
  mediaType?: string;
  year?: string;
};

export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type MovieListResponse = {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
};

type Rating = {
  Source: string;
  Value: string;
};

export type MovieDetailResponseType = {
  Title: string;
  Year: string;
  Rated: string | 'N/A';
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string | 'N/A';
  Writer: string | 'N/A';
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string | 'N/A';
  Poster: string;
  Ratings: Rating[];
  Metascore: string | 'N/A';
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string | 'N/A';
  BoxOffice: string | 'N/A';
  Production: string | 'N/A';
  Website: string | 'N/A';
  Response: 'True' | 'False';
  Error: 'Incorrect IMDb ID.' | 'Movie not found!' | string;
};

export type MoveDetailType = Omit<
  MovieDetailResponseType,
  'Response' | 'Error'
>;
