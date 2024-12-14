import React from 'react';
import { useNavigate } from 'react-router';

import styles from './MovieListItem.module.scss';
// import { defaultPoster } from '@/constants';

interface MovieListItemProps {
  imdbID: string;
  year: string;
  title: string;
  type: string;
  poster: string;
}

const MovieListItem: React.FC<MovieListItemProps> = ({
  imdbID,
  year,
  title,
  type,
  poster,
}) => {
  const navigate = useNavigate();
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      'https://via.placeholder.com/300x450?text=Image+Not+Found';
  };

  const onDetailClick = () => {
    navigate(`/media/${imdbID}`);
  };

  return (
    <div
      className={styles.movieItem}
      data-testid={'movie-item'}
      onClick={onDetailClick}
    >
      <div className={styles.posterWrapper}>
        <img
          src={poster}
          alt={title}
          onError={handleImageError}
          loading="lazy"
          className={styles.poster}
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.metadata}>
          <span className={styles.year}>{year}</span>
          <span className={styles.type}>{type}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieListItem;
