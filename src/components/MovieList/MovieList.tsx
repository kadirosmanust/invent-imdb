import { LinkOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router';

import useSetSearchParams from '@/hooks/useSetSearchParams';
import { useAppSelector } from '@/store';
import {
  getMoviesApiSelector,
  getMoviesSelector,
  getTotalResultsSelector,
} from '@/store/reducers/movie';

import styles from './MovieList.module.scss';

const MovieList = () => {
  const moviesApi = useAppSelector(getMoviesApiSelector);
  const movies = useAppSelector(getMoviesSelector);
  const totalResults = useAppSelector(getTotalResultsSelector);
  const navigate = useNavigate();
  const { updateSearchParams, searchParams } = useSetSearchParams();

  const page = searchParams.get('page') || '1';

  const onPageChange = (page: number) => {
    updateSearchParams('page', page.toString());
  };

  return (
    <div className={styles.container}>
      <Table
        dataSource={movies}
        loading={moviesApi.isLoading}
        rowKey={record => record.imdbID}
        style={{ width: '100%' }}
        scroll={{ x: 'max-content' }}
        columns={[
          {
            title: 'Title',
            dataIndex: 'Title',
            key: 'Title',
            render: (text, record) => {
              return (
                <Button
                  type="link"
                  onClick={() => navigate(`/media/${record.imdbID}`)}
                >
                  <LinkOutlined />
                  {text}
                </Button>
              );
            },
          },
          {
            title: 'Year',
            dataIndex: 'Year',
            key: 'Year',
          },
          {
            title: 'IMDb ID',
            dataIndex: 'imdbID',
            key: 'imdbID',
          },
        ]}
        pagination={{
          current: parseInt(page),
          total: totalResults,
          onChange: onPageChange,
          showSizeChanger: false,
          pageSize: 10,
        }}
      />
    </div>
  );
};

export default MovieList;
