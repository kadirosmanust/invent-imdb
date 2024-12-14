import { LoadingOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Empty, Result, Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useAppSelector } from '@/store';
import useMovieDetailApi from '@/store/api/useMovieDetailApi';
import {
  getMovieDetailApiSelector,
  getMovieDetailSelector,
} from '@/store/reducers/movie';

import styles from './Detail.module.scss';
const Detail = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const navigate = useNavigate();
  const { trigger } = useMovieDetailApi();
  const movieDetail = useAppSelector(getMovieDetailSelector);
  const movieApiStates = useAppSelector(getMovieDetailApiSelector);
  const handleGoBack = () => {
    if (window.history.state.idx >= 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    if (imdbID) {
      trigger(imdbID);
    }
  }, [imdbID, trigger]);

  if (movieApiStates.isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 54 }} spin />}
          tip="Loading..."
        />
      </div>
    );
  }

  if (movieApiStates.error) {
    return (
      <div className={styles.errorContainer}>
        <Result
          status="error"
          title="Error"
          subTitle={movieApiStates.error}
          extra={[
            <Button
              type="default"
              onClick={handleGoBack}
              icon={<WarningOutlined />}
              key="retry"
            >
              Go Back
            </Button>,
          ]}
        />
      </div>
    );
  }

  if (!movieDetail) {
    return (
      <div className={styles.emptyContainer}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>No movie details found</span>}
        >
          <Button type="primary" onClick={handleGoBack}>
            Go Back
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleGoBack}>
        ← Back
      </button>
      <div className={styles.header}>
        <div className={styles.poster}>
          <img src={movieDetail.Poster} alt={movieDetail.Title} />
        </div>
        <div className={styles.info}>
          <h1>{movieDetail.Title}</h1>
          <div className={styles.metadata}>
            <span>{movieDetail.Year}</span>
            <span>{movieDetail.Runtime}</span>
            <span>{movieDetail.Genre}</span>
          </div>
          <p className={styles.plot}>{movieDetail.Plot}</p>
          <div className={styles.ratings}>
            {movieDetail.Ratings.map(rating => (
              <div key={rating.Source} className={styles.rating}>
                <span>{rating.Source}</span>
                <span>{rating.Value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <h3>Director</h3>
          <p>{movieDetail.Director}</p>
        </div>
        <div className={styles.detailItem}>
          <h3>Writers</h3>
          <p>{movieDetail.Writer}</p>
        </div>
        <div className={styles.detailItem}>
          <h3>Cast</h3>
          <p>{movieDetail.Actors}</p>
        </div>
        <div className={styles.detailItem}>
          <h3>Release Date</h3>
          <p>{movieDetail.Released}</p>
        </div>
        <div className={styles.detailItem}>
          <h3>Languages</h3>
          <p>{movieDetail.Language}</p>
        </div>
        <div className={styles.detailItem}>
          <h3>Country</h3>
          <p>{movieDetail.Country}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
