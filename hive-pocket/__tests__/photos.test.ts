import { mergePhotos, removePhoto, MAX_PHOTOS } from '../lib/photos';

describe('mergePhotos', () => {
  it('appends new URIs after existing ones', () => {
    expect(mergePhotos(['a'], ['b', 'c'])).toEqual(['a', 'b', 'c']);
  });

  it('de-duplicates while preserving order', () => {
    expect(mergePhotos(['a', 'b'], ['b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
  });

  it('caps the total at max', () => {
    const many = Array.from({ length: 12 }, (_, i) => `p${i}`);
    expect(mergePhotos([], many)).toHaveLength(MAX_PHOTOS);
  });

  it('handles undefined inputs and drops empty strings', () => {
    expect(mergePhotos(undefined, ['a', '', 'b'])).toEqual(['a', 'b']);
    expect(mergePhotos()).toEqual([]);
  });

  it('does not mutate inputs', () => {
    const existing = ['a'];
    mergePhotos(existing, ['b']);
    expect(existing).toEqual(['a']);
  });
});

describe('removePhoto', () => {
  it('removes the matching URI', () => {
    expect(removePhoto(['a', 'b', 'c'], 'b')).toEqual(['a', 'c']);
  });
  it('is a no-op when not present', () => {
    expect(removePhoto(['a'], 'x')).toEqual(['a']);
  });
});
