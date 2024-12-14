import dayjs from 'dayjs';
import { useCallback } from 'react';

import { MediaType } from '@/constants/movie';
import { MovieListRequest, MovieListResponse } from '@/types/movie';
import axiosInstance from '@/utils/axiosHelper';
import createLRUCache from '@/utils/LRUCache';

import { useAppDispatch } from '..';
import { setMovies, setMoviesApi } from '../reducers/movie';

type useMovieListApiReturn = {
  trigger: (_request: MovieListRequest) => void;
};

const movieCache = createLRUCache<
  string,
  MovieListResponse & {
    expires: number;
  }
>(10);

const useMovieListApi = (): useMovieListApiReturn => {
  const dispatch = useAppDispatch();

  const trigger = useCallback(
    async (request: MovieListRequest) => {
      const { mediaType, page, searchText, year } = request;
      const key = `${page}-${searchText}-${mediaType}-${year}`;
      const cachedData = movieCache.get(key);

      if (cachedData) {
        if (cachedData.expires < dayjs().valueOf()) {
          movieCache.delete(key);
        } else {
          dispatch(
            setMovies({
              movies: cachedData.Search,
              totalResults: parseInt(cachedData.totalResults),
            }),
          );
          dispatch(setMoviesApi({ error: null, isLoading: false }));
          return;
        }
      }

      dispatch(setMoviesApi({ error: null, isLoading: true }));

      try {
        const response = await axiosInstance.get<MovieListResponse>('/', {
          params: {
            s: searchText,
            type: mediaType === MediaType.ALL ? undefined : mediaType,
            y: year,
            page: page,
          },
        });

        const result = response.data;

        if (
          result.Response === 'False' &&
          result.Error === 'Movie not found!'
        ) {
          dispatch(setMovies({ movies: [], totalResults: 0 }));
          movieCache.set(key, {
            Search: [],
            totalResults: '0',
            expires: dayjs().add(1, 'minute').valueOf(),
            Response: '',
          });
        } else {
          movieCache.set(key, {
            ...result,
            expires: dayjs().add(1, 'minute').valueOf(),
          });
          dispatch(
            setMovies({
              movies: result.Search,
              totalResults: parseInt(result.totalResults),
            }),
          );
        }
      } catch (err: unknown) {
        dispatch(setMoviesApi({ error: err as string, isLoading: false }));
      } finally {
        dispatch(setMoviesApi({ isLoading: false, error: null }));
      }
    },
    [dispatch],
  );

  return { trigger };
};

export default useMovieListApi;
