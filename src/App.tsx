import { useEffect, useState } from 'react';
import FavoritesPanel from './components/FavoritesPanel';
import MainDogDisplay from './components/MainDogDisplay';
import ThumbnailGallery from './components/ThumbnailGallery';
import { fetchRandomDog, fetchRandomDogs } from './lib/dogApi';
import type { Dog } from './types/dog';

function App() {
  const [mainDog, setMainDog] = useState<Dog | null>(null);
  const [galleryDogs, setGalleryDogs] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  function handleAddFavorite() {
    if (!mainDog) {
      return;
    }

    setFavorites((currentFavorites) => {
      if (currentFavorites.some((favorite) => favorite.imageUrl === mainDog.imageUrl)) {
        return currentFavorites;
      }

      return [mainDog, ...currentFavorites];
    });
  }

  function handleRemoveFavorite(dogId: string) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((favorite) => favorite.id !== dogId),
    );
  }

  useEffect(() => {
    let isMounted = true;

    async function loadDogs() {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const [nextMainDog, nextGalleryDogs] = await Promise.all([
          fetchRandomDog(),
          fetchRandomDogs(10),
        ]);

        if (!isMounted) {
          return;
        }

        setMainDog(nextMainDog);
        setGalleryDogs(nextGalleryDogs);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDogs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Dog Viewer</h1>
        <p>Browse random dogs, explore the gallery, and save favorites.</p>
      </header>

      <main className="app-main">
        <div className="app-layout">
          <section className="main-column">
            {errorMessage ? (
              <div className="placeholder-card" role="alert">
                <h2>Unable to load dogs</h2>
                <p>{errorMessage}</p>
              </div>
            ) : (
              <>
                <MainDogDisplay dog={mainDog} />

                <div className="actions-row">
                  <button
                    type="button"
                    className="primary-button"
                    onClick={handleAddFavorite}
                    disabled={!mainDog}
                  >
                    Add Current Dog to Favorites
                  </button>
                </div>

                {!isLoading && (
                  <ThumbnailGallery dogs={galleryDogs} onSelectDog={setMainDog} />
                )}
              </>
            )}
          </section>

          <FavoritesPanel
            favorites={favorites}
            onSelectFavorite={setMainDog}
            onRemoveFavorite={handleRemoveFavorite}
          />
        </div>
      </main>
    </div>
  );
}

export default App;

