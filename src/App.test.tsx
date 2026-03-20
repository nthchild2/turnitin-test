import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';
import { fetchRandomDog, fetchRandomDogs } from './lib/dogApi';
import type { Dog } from './types/dog';

jest.mock('./lib/dogApi', () => ({
  fetchRandomDog: jest.fn(),
  fetchRandomDogs: jest.fn(),
}));

const mockedFetchRandomDog = fetchRandomDog as jest.MockedFunction<typeof fetchRandomDog>;
const mockedFetchRandomDogs = fetchRandomDogs as jest.MockedFunction<typeof fetchRandomDogs>;

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads dogs and supports add/remove favorites interactions', async () => {
    const mainDog: Dog = {
      id: 'dog-main',
      imageUrl: 'https://images.dog.ceo/breeds/pug/n02110958_12062.jpg',
      breedLabel: 'Pug',
    };

    const galleryDogs: Dog[] = [
      {
        id: 'dog-gallery-1',
        imageUrl: 'https://images.dog.ceo/breeds/labrador/n02099712_443.jpg',
        breedLabel: 'Labrador Retriever',
      },
      {
        id: 'dog-gallery-2',
        imageUrl: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
        breedLabel: 'Afghan Hound',
      },
    ];

    mockedFetchRandomDog.mockResolvedValue(mainDog);
    mockedFetchRandomDogs.mockResolvedValue(galleryDogs);

    render(<App />);

    expect(await screen.findByRole('heading', { name: 'Pug' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'More Dogs' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Add Current Dog to Favorites' }));
    expect(screen.getByRole('button', { name: /^Pug Pug$/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Labrador Retriever/i }));
    expect(await screen.findByRole('heading', { name: 'Labrador Retriever' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Add Current Dog to Favorites' }));
    const favoritesPanel = screen.getByRole('complementary', { name: 'Saved Dogs' });
    expect(
      within(favoritesPanel).getByRole('button', {
        name: /^Labrador Retriever Labrador Retriever$/i,
      }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Remove Pug from favorites' }));
    expect(screen.queryByRole('button', { name: /^Pug$/i })).not.toBeInTheDocument();
  });

  it('renders API errors as an alert', async () => {
    mockedFetchRandomDog.mockRejectedValue(new Error('Unable to fetch dogs right now.'));
    mockedFetchRandomDogs.mockRejectedValue(new Error('Unable to fetch dogs right now.'));

    render(<App />);

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Unable to load dogs')).toBeInTheDocument();
    expect(screen.getByText('Unable to fetch dogs right now.')).toBeInTheDocument();
  });
});

