import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './photo.actions';
import { PhotoModel } from '../../models/photo.model';

export const PHOTO_FEATURE_KEY = 'photo-store';

export interface PhotoState {
    photos: PhotoModel[];
    page: number;
    favorites: PhotoModel[];
}

export const initialState: PhotoState = {
  photos: [],
  page: 1,
  favorites: []
}

const photoReducer = createReducer(
    initialState,
    on(actions.getPhotosSuccess, (state, { photos }) => ({
      ...state,
      photos: [...state.photos, ...photos],
      page: state.page + 1
    })),
  on(actions.addPhotoToFavoritesSuccess, (state, { photo }) => ({
    ...state,
    favorites: [...state.favorites, photo],
  })),
  on(actions.removePhotoFromFavoritesSuccess, (state, { photo }) => ({
    ...state,
    favorites: state.favorites.filter((item) => item.id !== photo.id),
  })),
);

export function reducer(state: PhotoState | undefined, action: Action) {
    return photoReducer(state, action);
}
