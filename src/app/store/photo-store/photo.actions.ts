import { createAction, props } from '@ngrx/store';
import { createFailureAction, createSuccessAction } from '../utils/action-utils';
import { PhotoModel } from '../../models/photo.model';

export const getPhotos = createAction('[Photos] Get Photo List');
export const getPhotosSuccess = createSuccessAction(
  getPhotos,
    props<{ photos: PhotoModel[]}>()
);
export const getPhotosFailure = createFailureAction(getPhotos);

export const addPhotoToFavorites = createAction('[Photos] Add photo to favorites', props<{ photo: PhotoModel}>());
export const addPhotoToFavoritesSuccess = createSuccessAction(
  addPhotoToFavorites,
  props<{ photo: PhotoModel}>()
);
export const addPhotoToFavoritesFailure = createFailureAction(addPhotoToFavorites);

export const removePhotoFromFavorites = createAction('[Photos] Remove photo from favorites', props<{ photo: PhotoModel}>());
export const removePhotoFromFavoritesSuccess = createSuccessAction(
  removePhotoFromFavorites,
  props<{ photo: PhotoModel}>()
);
export const removePhotoFromFavoritesFailure = createFailureAction(removePhotoFromFavorites);
