import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import MovieListItem from './MovieListItem';

vi.mock('react-router', () => {
  const originalModule = vi.importActual('react-router');
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

const mockNavigate = vi.fn();

describe('MovieListItem', () => {
  const mockProps = {
    imdbID: 'tt1234567',
    year: '2023',
    title: 'Test Movie',
    type: 'movie',
    poster: 'https://example.com/poster.jpg',
  };
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders movie item with correct props', () => {
    render(<MovieListItem {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.year)).toBeInTheDocument();
    expect(screen.getByText(mockProps.type)).toBeInTheDocument();
    expect(screen.getByAltText(mockProps.title)).toHaveAttribute(
      'src',
      mockProps.poster,
    );
  });
  test('navigates to detail page on click', () => {
    render(<MovieListItem {...mockProps} />);

    const movieItem = screen.getByTestId('movie-item');
    fireEvent.click(movieItem);

    expect(mockNavigate).toHaveBeenCalledWith(`/media/${mockProps.imdbID}`);
  });
  test('handles image loading error', () => {
    render(<MovieListItem {...mockProps} />);
    const image = screen.getByAltText(mockProps.title);

    fireEvent.error(image);

    expect(image).toHaveAttribute(
      'src',
      'https://via.placeholder.com/300x450?text=Image+Not+Found',
    );
  });
});
