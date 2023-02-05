import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoModel } from '../../models/photo.model';
import { select, Store } from '@ngrx/store';
import * as selectors from '../../store/photo-store/photo.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {

  photos$: Observable<PhotoModel[]> = this.store.pipe(select(selectors.getFavorites));

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    ) { }

  openPhoto(photo: PhotoModel) {
    this.router.navigate([`/photo/${photo.id}`])
  }

}
