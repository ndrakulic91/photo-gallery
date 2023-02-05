import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo/photo.service';
import { Observable } from 'rxjs';
import { PhotoModel } from '../../models/photo.model';
import { select, Store } from '@ngrx/store';
import * as actions from '../../store/photo-store/photo.actions';
import * as selectors from '../../store/photo-store/photo.selectors';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {

  constructor(
    private readonly photoService: PhotoService,
    private readonly store: Store
  ) { }

  photos$: Observable<PhotoModel[]> = this.store.pipe(select(selectors.getAllPhotos));

  ngOnInit() {
    this.loadMorePhotos();
  }

  loadMorePhotos(ev?: any) {
    this.store.dispatch(actions.getPhotos());

    if(!ev) return;

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  addToFavorites(photo: PhotoModel) {
    this.store.dispatch(actions.addPhotoToFavorites({ photo }));
  }

}
