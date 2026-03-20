import { normalizeDog } from './normalizeDog';

const DOG_API_BASE_URL = 'https://dog.ceo/api';

async function requestDogs(endpoint) {
  const response = await fetch(`${DOG_API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error('Unable to fetch dogs right now.');
  }

  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error('Dog API returned an unexpected response.');
  }

  return data.message;
}

export async function fetchRandomDog() {
  const imageUrl = await requestDogs('/breeds/image/random');

  return normalizeDog(imageUrl);
}

export async function fetchRandomDogs(count = 10) {
  const imageUrls = await requestDogs(`/breeds/image/random/${count}`);

  return imageUrls.map((imageUrl, index) => normalizeDog(imageUrl, `${index}-${imageUrl}`));
}

