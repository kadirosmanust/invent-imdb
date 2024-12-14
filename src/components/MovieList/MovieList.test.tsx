import '@testing-library/jest-dom';

import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { useAppSelector } from '@/store';
import movieReducer, {
  getMoviesApiSelector,
  getMoviesSelector,
  getTotalResultsSelector,
} from '@/store/reducers/movie';

import MovieList from './MovieList';
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

const mockNavigate = vi.fn();
vi.mock('react-router', () => {
  const originalModule = vi.importActual('react-router');
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

// Mock selectors
vi.mock('@/store', () => ({
  ...vi.importActual('@/store'),
  useAppSelector: vi.fn(),
}));

describe('MovieList', () => {
  const mockMovies = [
    { Title: 'Movie 1', Year: '2021', imdbID: 'tt1234567' },
    { Title: 'Movie 2', Year: '2022', imdbID: 'tt7654321' },
  ];

  const mockStore = configureStore({
    reducer: {
      movie: movieReducer,
    },
  });

  beforeEach(() => {
    mockNavigate.mockClear();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useAppSelector as any).mockImplementation((selector: any) => {
      if (selector === getMoviesApiSelector) return { isLoading: false };
      if (selector === getMoviesSelector) return mockMovies;
      if (selector === getTotalResultsSelector) return 2;
    });
  });

  test('renders movie list with correct data', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <MovieList />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });

  test('navigates to detail page on button click', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <MovieList />
        </Router>
      </Provider>,
    );

    const movieButton = screen.getByText('Movie 1');
    fireEvent.click(movieButton);

    expect(mockNavigate).toHaveBeenCalledWith('/media/tt1234567');
  });

  test('handles pagination correctly', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <MovieList />
        </Router>
      </Provider>,
    );

    const paginationButton = screen.getByRole('button', { name: /2/i });
    fireEvent.click(paginationButton);

    expect(mockNavigate).toHaveBeenCalledWith('/media/tt7654321');
  });
});
