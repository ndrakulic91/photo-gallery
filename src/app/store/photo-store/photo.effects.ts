import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as actions from './photo.actions';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { PhotoService } from '../../services/photo/photo.service';
import { of } from 'rxjs';
import { getFavorites, getPage } from './photo.selectors';
import { PhotoModel } from '../../models/photo.model';
import { ToastController } from '@ionic/angular';
import { ToastService } from '../../services/toast/toast.service';

@Injectable()
export class PhotoEffects {

  getPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getPhotos),
      withLatestFrom(this.store.select(getPage)),
      switchMap(([_action, page]) => this.photoService.getPhotos(page).pipe(
          map((photos) => actions.getPhotosSuccess({ photos })),
          catchError((error) => of(actions.getPhotosFailure({ error })))
        )
      )
    )
  );

  addPhotoToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addPhotoToFavorites),
      withLatestFrom(this.store.select(getFavorites)),
      map(([_action, favorites]) => {
          if (!!favorites.find((photo: PhotoModel) => photo.id === _action.photo.id)) {
            this.toastService.presentToast('Already added to favorites', 'error');
            return actions.addPhotoToFavoritesFailure({ error: 'Already added to favorites' })
          }
          this.toastService.presentToast('Added to favorites', 'success');
          return actions.addPhotoToFavoritesSuccess({ photo: _action.photo })
        }
      )
    )
  );

  removePhotoFromFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.removePhotoFromFavorites),
      withLatestFrom(this.store.select(getFavorites)),
      map(([_action, favorites]) => {
          if (!favorites.find((photo: PhotoModel) => photo.id === _action.photo.id)) {
            this.toastService.presentToast('Photo does not exist in favorites', 'error');
            return actions.removePhotoFromFavoritesFailure({ error: 'Photo does not exist in favorites' })
          }
          this.toastService.presentToast('Removed from favorites', 'success');
          return actions.removePhotoFromFavoritesSuccess({ photo: _action.photo })
        }
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly photoService: PhotoService,
    private readonly toastService: ToastService
  ) {}
}
