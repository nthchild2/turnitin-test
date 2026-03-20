function ThumbnailGallery({ dogs, onSelectDog }) {
  return (
    <section className="gallery-card" aria-labelledby="gallery-heading">
      <div className="section-heading">
        <p className="section-eyebrow">Gallery</p>
        <h2 id="gallery-heading">More Dogs</h2>
      </div>

      <div className="thumbnail-grid">
        {dogs.map((dog) => (
          <button
            key={dog.id}
            type="button"
            className="thumbnail-card"
            onClick={() => onSelectDog?.(dog)}
          >
            <div className="thumbnail-media">
              <img className="thumbnail-image" src={dog.imageUrl} alt={dog.breedLabel} />
            </div>
            <span className="thumbnail-label">{dog.breedLabel}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default ThumbnailGallery;

