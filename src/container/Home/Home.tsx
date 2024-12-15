import { SearchOutlined } from '@ant-design/icons';
import { DatePicker, Input, Segmented } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useRef } from 'react';

import MovieList from '@/components/MovieList';
import { MediaType, MediaTypesOptions } from '@/constants/movie';
import useDebounce from '@/hooks/useDebounce';
import useSetSearchParams from '@/hooks/useSetSearchParams';
import useMovieListApi from '@/store/api/useMovieListApi';

import styles from './Home.module.scss';

const Home = () => {
  const { updateSearchParams, searchParams } = useSetSearchParams();

  const searchTerm = searchParams.get('s') || '';
  const year = searchParams.get('y') || undefined;
  const type = searchParams.get('type') || MediaType.ALL;
  const page = searchParams.get('page') || '1';
  const { trigger } = useMovieListApi();

  // Ref to track initial render
  const debouncedValue = useDebounce(searchTerm, 500);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!searchTerm) {
        updateSearchParams('s', 'Pokemon');
      } else {
        trigger({
          mediaType: type,
          searchText: debouncedValue,
          year: year,
          page: parseInt(page),
        });
      }
    } else if (debouncedValue) {
      trigger({
        mediaType: type,
        searchText: debouncedValue,
        year: year,
        page: parseInt(page),
      });
    }
  }, [
    debouncedValue,
    page,
    searchTerm,
    trigger,
    type,
    updateSearchParams,
    year,
  ]);

  const handleSearch = (value: string) => {
    if (value) {
      updateSearchParams('s', value);
    } else {
      updateSearchParams('s', '');
    }
  };

  const onFilterChange = (value: string) => {
    updateSearchParams('type', value === MediaType.ALL ? '' : value);
  };

  const onYearChange = (value: Dayjs) => {
    const isValidDate = dayjs(value).isValid();
    if (isValidDate) {
      const year = dayjs(value).get('year');

      updateSearchParams('y', year.toString());
    } else {
      updateSearchParams('y', '');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Invent IMDb</h1>
        <p>Search for movies</p>
      </div>
      <div className={styles.filter}>
        <Input
          value={searchTerm}
          allowClear
          prefix={<SearchOutlined />}
          onChange={e => {
            handleSearch(e.target.value);
          }}
          placeholder="Search for movies"
          width={300}
          size="large"
        />
        <Segmented
          options={MediaTypesOptions}
          value={type}
          onChange={onFilterChange}
          id="mediaType"
          size="large"
        />
        <DatePicker
          onChange={onYearChange}
          defaultValue={year ? dayjs(year) : undefined}
          picker="year"
          size="large"
        />
      </div>
      <div className={styles.content}>
        <MovieList />
      </div>
    </div>
  );
};

export default Home;
