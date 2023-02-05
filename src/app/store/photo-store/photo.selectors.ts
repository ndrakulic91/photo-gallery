import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PhotoState, PHOTO_FEATURE_KEY } from './photo.reducer';

export const getPhotoState = createFeatureSelector<PhotoState>(PHOTO_FEATURE_KEY);

export const getAllPhotos = createSelector(getPhotoState, (state) => state.photos);
export const getFavorites = createSelector(getPhotoState, (state) => state.favorites);
export const getPage = createSelector(getPhotoState, (state) => state.page);
export const getPhotoById = (id: string) => createSelector(getAllPhotos, (allPhotos) => {
  if (!allPhotos) {
    return null;
  }
  return allPhotos.find(photo => {
    return photo.id === id;
  });
});
