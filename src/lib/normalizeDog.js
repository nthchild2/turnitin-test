function formatBreedSegment(segment) {
  return segment
    .split('-')
    .filter(Boolean)
    .reverse()
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function deriveBreedLabel(imageUrl) {
  try {
    const { pathname } = new URL(imageUrl);
    const match = pathname.match(/\/breeds\/([^/]+)\//);

    if (!match) {
      return 'Unknown Breed';
    }

    return formatBreedSegment(match[1]);
  } catch {
    return 'Unknown Breed';
  }
}

export function normalizeDog(imageUrl, idSuffix = '') {
  return {
    id: idSuffix ? `dog-${idSuffix}` : imageUrl,
    imageUrl,
    breedLabel: deriveBreedLabel(imageUrl),
  };
}

