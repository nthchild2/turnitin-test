import { render, screen } from '@testing-library/react';
import MainDogDisplay from './MainDogDisplay';

describe('MainDogDisplay', () => {
  it('shows loading placeholder when there is no dog', () => {
    render(<MainDogDisplay dog={null} />);

    expect(screen.getByText('Loading dog…')).toBeInTheDocument();
  });

  it('renders selected dog image and breed label', () => {
    render(
      <MainDogDisplay
        dog={{
          id: 'dog-1',
          imageUrl: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
          breedLabel: 'Afghan Hound',
        }}
      />,
    );

    expect(screen.getByRole('img', { name: 'Afghan Hound' })).toHaveAttribute(
      'src',
      'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
    );
    expect(screen.getByRole('heading', { name: 'Afghan Hound' })).toBeInTheDocument();
  });
});

