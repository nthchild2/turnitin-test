import { fireEvent, render, screen } from '@testing-library/react';
import ThumbnailGallery from './ThumbnailGallery';
import type { Dog } from '../types/dog';

const dogs: Dog[] = [
  {
    id: 'dog-1',
    imageUrl: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
    breedLabel: 'Afghan Hound',
  },
  {
    id: 'dog-2',
    imageUrl: 'https://images.dog.ceo/breeds/labrador/n02099712_443.jpg',
    breedLabel: 'Labrador Retriever',
  },
];

describe('ThumbnailGallery', () => {
  it('renders all dog thumbnails', () => {
    render(<ThumbnailGallery dogs={dogs} />);

    expect(screen.getByRole('heading', { name: 'More Dogs' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Afghan Hound' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Labrador Retriever' })).toBeInTheDocument();
  });

  it('calls onSelectDog when a thumbnail is clicked', () => {
    const onSelectDog = jest.fn();

    render(<ThumbnailGallery dogs={dogs} onSelectDog={onSelectDog} />);

    fireEvent.click(screen.getByRole('button', { name: /Labrador Retriever/i }));

    expect(onSelectDog).toHaveBeenCalledTimes(1);
    expect(onSelectDog).toHaveBeenCalledWith(dogs[1]);
  });
});

