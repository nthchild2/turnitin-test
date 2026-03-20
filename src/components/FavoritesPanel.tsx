import type { Dog } from '../types/dog';

interface FavoritesPanelProps {
  favorites: Dog[];
  onSelectFavorite?: (dog: Dog) => void;
  onRemoveFavorite?: (dogId: string) => void;
}

function FavoritesPanel({
  favorites,
  onSelectFavorite,
  onRemoveFavorite,
}: FavoritesPanelProps) {
  return (
    <aside className="favorites-panel" aria-labelledby="favorites-heading">
      <div className="section-heading">
        <p className="section-eyebrow">Favorites</p>
        <h2 id="favorites-heading">Saved Dogs</h2>
      </div>

      {favorites.length === 0 ? (
        <p className="favorites-empty">No favorites saved yet.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((dog) => (
            <li key={dog.id}>
              <div className="favorite-card">
                <button
                  type="button"
                  className="favorite-select"
                  onClick={() => onSelectFavorite?.(dog)}
                >
                  <img className="favorite-image" src={dog.imageUrl} alt={dog.breedLabel} />
                  <span className="favorite-label">{dog.breedLabel}</span>
                </button>

                <button
                  type="button"
                  className="favorite-remove"
                  onClick={() => onRemoveFavorite?.(dog.id)}
                  aria-label={`Remove ${dog.breedLabel} from favorites`}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default FavoritesPanel;

