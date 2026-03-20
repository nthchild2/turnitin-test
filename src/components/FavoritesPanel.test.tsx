import { fireEvent, render, screen } from '@testing-library/react';
import FavoritesPanel from './FavoritesPanel';
import type { Dog } from '../types/dog';

const favorites: Dog[] = [
  {
    id: 'dog-1',
    imageUrl: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
    breedLabel: 'Afghan Hound',
  },
];

describe('FavoritesPanel', () => {
  it('shows empty state when there are no favorites', () => {
    render(<FavoritesPanel favorites={[]} />);

    expect(screen.getByText('No favorites saved yet.')).toBeInTheDocument();
  });

  it('calls onSelectFavorite when a favorite is clicked', () => {
    const onSelectFavorite = jest.fn();

    render(<FavoritesPanel favorites={favorites} onSelectFavorite={onSelectFavorite} />);

    fireEvent.click(screen.getByRole('button', { name: /^Afghan Hound Afghan Hound$/i }));

    expect(onSelectFavorite).toHaveBeenCalledTimes(1);
    expect(onSelectFavorite).toHaveBeenCalledWith(favorites[0]);
  });

  it('calls onRemoveFavorite when remove is clicked', () => {
    const onRemoveFavorite = jest.fn();

    render(<FavoritesPanel favorites={favorites} onRemoveFavorite={onRemoveFavorite} />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Afghan Hound from favorites' }),
    );

    expect(onRemoveFavorite).toHaveBeenCalledTimes(1);
    expect(onRemoveFavorite).toHaveBeenCalledWith('dog-1');
  });
});

