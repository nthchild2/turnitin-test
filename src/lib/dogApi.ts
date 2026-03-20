import { normalizeDog } from './normalizeDog';
import type { Dog, DogApiResponse } from '../types/dog';

const DOG_API_BASE_URL = 'https://dog.ceo/api';

async function requestDogs(endpoint: string): Promise<string | string[]> {
  const response = await fetch(`${DOG_API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error('Unable to fetch dogs right now.');
  }

  const data: DogApiResponse<string | string[]> = await response.json();

  if (data.status !== 'success') {
    throw new Error('Dog API returned an unexpected response.');
  }

  return data.message;
}

export async function fetchRandomDog(): Promise<Dog> {
  const imageUrl = await requestDogs('/breeds/image/random');

  if (typeof imageUrl !== 'string') {
    throw new Error('Dog API returned an unexpected response.');
  }

  return normalizeDog(imageUrl);
}

export async function fetchRandomDogs(count = 10): Promise<Dog[]> {
  const imageUrls = await requestDogs(`/breeds/image/random/${count}`);

  if (!Array.isArray(imageUrls)) {
    throw new Error('Dog API returned an unexpected response.');
  }

  return imageUrls.map((imageUrl, index) => normalizeDog(imageUrl, `${index}-${imageUrl}`));
}

