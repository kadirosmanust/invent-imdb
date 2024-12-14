import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/store';
import { MoveDetailType, Movie } from '@/types/movie';

type MovieState = {
  movies?: Movie[];
  totalResults?: number;
  moviesApi: {
    error: string | null;
    isLoading: boolean;
  };
  movieDetail?: MoveDetailType;
  movieDetailApi: {
    error: string | null;
    isLoading: boolean;
  };
};

const getInitialState = (): MovieState => {
  return {
    moviesApi: {
      error: null,
      isLoading: false,
    },
    movies: undefined,
    totalResults: undefined,
    movieDetail: undefined,
    movieDetailApi: {
      error: null,
      isLoading: false,
    },
  };
};

const initialState: MovieState = getInitialState();

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMovies(
      state,
      action: PayloadAction<{
        movies: Movie[];
        totalResults: number;
      }>,
    ) {
      state.movies = action.payload.movies;
      state.totalResults = action.payload.totalResults
        ? action.payload.totalResults
        : 0;
    },
    setMoviesApi(state, action: PayloadAction<MovieState['moviesApi']>) {
      state.moviesApi = {
        ...state.moviesApi,
        ...action.payload,
      };
    },
    setMovieDetail(state, action: PayloadAction<MovieState['movieDetail']>) {
      state.movieDetail = action.payload;
    },
    setMovieDetailApi(
      state,
      action: PayloadAction<MovieState['movieDetailApi']>,
    ) {
      state.movieDetailApi = {
        ...state.movieDetailApi,
        ...action.payload,
      };
    },
  },
});

export const getMoviesSelector = (state: RootState) => state.movie.movies;
export const getMoviesApiSelector = (state: RootState) => state.movie.moviesApi;
export const getTotalResultsSelector = (state: RootState) =>
  state.movie.totalResults;

export const getMovieDetailSelector = (state: RootState) =>
  state.movie.movieDetail;
export const getMovieDetailApiSelector = (state: RootState) =>
  state.movie.movieDetailApi;
export const { setMovies, setMoviesApi, setMovieDetail, setMovieDetailApi } =
  slice.actions;

export default slice.reducer;
