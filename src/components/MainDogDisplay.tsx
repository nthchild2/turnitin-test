import type { Dog } from '../types/dog';

interface MainDogDisplayProps {
  dog: Dog | null;
}

function MainDogDisplay({ dog }: MainDogDisplayProps) {
  if (!dog) {
    return (
      <section className="main-dog-card" aria-live="polite">
        <div className="main-dog-placeholder">Loading dog…</div>
      </section>
    );
  }

  return (
    <section className="main-dog-card" aria-live="polite">
      <div className="main-dog-media">
        <img className="main-dog-image" src={dog.imageUrl} alt={dog.breedLabel} />
      </div>
      <div className="main-dog-copy">
        <p className="section-eyebrow">Main Dog</p>
        <h2>{dog.breedLabel}</h2>
      </div>
    </section>
  );
}

export default MainDogDisplay;

