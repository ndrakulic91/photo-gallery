import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { PhotoState, reducer as photoReducer } from '../photo-store/photo.reducer';
import { hydrationMetaReducer } from './hydration.reducer';

export interface State {
  photos: PhotoState;
}

export const reducers: ActionReducerMap<State> = {
  photos: photoReducer,
};

export const metaReducer: MetaReducer[] = [hydrationMetaReducer];

