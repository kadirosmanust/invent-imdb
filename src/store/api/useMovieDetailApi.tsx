import dayjs from 'dayjs';
import { useCallback } from 'react';

import { MoveDetailType, MovieDetailResponseType } from '@/types/movie';
import axiosInstance from '@/utils/axiosHelper';
import createLRUCache from '@/utils/LRUCache';

import { useAppDispatch } from '..';
import { setMovieDetail, setMovieDetailApi } from '../reducers/movie';

type useMovieListApiReturn = {
  trigger: (imdbId: string) => void;
};

const movieCache = createLRUCache<
  string,
  MoveDetailType & {
    expires: number;
  }
>(10);

const useMovieDetailApi = (): useMovieListApiReturn => {
  const dispatch = useAppDispatch();

  const trigger = useCallback(
    async (imdbId: string) => {
      const key = `detail-${imdbId}`;
      const cachedData = movieCache.get(key);

      if (cachedData) {
        if (cachedData.expires < dayjs().valueOf()) {
          movieCache.delete(key);
        } else {
          dispatch(
            setMovieDetail({
              ...cachedData,
            }),
          );
          dispatch(setMovieDetailApi({ error: null, isLoading: false }));
          return;
        }
      }

      dispatch(setMovieDetailApi({ error: null, isLoading: true }));

      try {
        const response = await axiosInstance.get<MovieDetailResponseType>('/', {
          params: {
            i: imdbId,
          },
        });

        const result = response.data;

        if (
          result.Response === 'False' ||
          result.Error === 'Movie not found!'
        ) {
          dispatch(
            setMovieDetailApi({
              error: result.Error,
              isLoading: false,
            }),
          );
        } else {
          movieCache.set(key, {
            ...result,
            expires: dayjs().add(1, 'minute').valueOf(),
          });
          dispatch(
            setMovieDetail({
              ...result,
            }),
          );
        }
      } catch (err: unknown) {
        dispatch(setMovieDetailApi({ error: err as string, isLoading: false }));
      } finally {
        dispatch(setMovieDetailApi({ isLoading: false, error: null }));
      }
    },
    [dispatch],
  );

  return { trigger };
};

export default useMovieDetailApi;
