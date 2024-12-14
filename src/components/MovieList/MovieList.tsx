import { LoadingOutlined } from '@ant-design/icons';
import { Empty, Spin } from 'antd';
import { useMemo } from 'react';

import useSetSearchParams from '@/hooks/useSetSearchParams';
import { useAppSelector } from '@/store';
import {
  getMoviesApiSelector,
  getMoviesSelector,
  getTotalResultsSelector,
} from '@/store/reducers/movie';

import MovieListItem from '../MovieListItem';
import Pagination from '../Pagination';
import styles from './MovieList.module.scss';

const MovieList = () => {
  const moviesApi = useAppSelector(getMoviesApiSelector);
  const movies = useAppSelector(getMoviesSelector);
  const totalResults = useAppSelector(getTotalResultsSelector);

  const { updateSearchParams, searchParams } = useSetSearchParams();

  const page = searchParams.get('page') || '1';

  const onPageChange = (page: number) => {
    updateSearchParams('page', page.toString());
  };

  const mappedMovies = useMemo(() => {
    if (!movies || movies.length < 1)
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

    return movies.map((movie, index) => (
      <MovieListItem
        key={`${movie.imdbID}-${index}`}
        imdbID={movie.imdbID}
        title={movie.Title}
        year={movie.Year}
        type={movie.Type}
        poster={movie.Poster}
      />
    ));
  }, [movies]);

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        {moviesApi.isLoading ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 54 }} spin />} />
        ) : (
          mappedMovies
        )}
      </div>
      <Pagination
        currentPage={parseInt(page) || 1}
        onChange={onPageChange}
        totalSize={totalResults}
      />
    </div>
  );
};

export default MovieList;
