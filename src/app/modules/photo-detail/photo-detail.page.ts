import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PhotoModel } from '../../models/photo.model';
import { select, Store } from '@ngrx/store';
import * as selectors from '../../store/photo-store/photo.selectors'
import * as actions from '../../store/photo-store/photo.actions'

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.page.html',
  styleUrls: ['./photo-detail.page.scss'],
})
export class PhotoDetailPage implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store
  ) {}

  photo$: Observable<PhotoModel> | undefined;

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        // @ts-ignore
        this.photo$ = this.store.pipe(select(selectors.getPhotoById(params['id'])));
      })
  }

  removeFromFavorites(photo: PhotoModel) {
    this.store.dispatch(actions.removePhotoFromFavorites({ photo }));
    this.router.navigate(['/favorites']);
  }
}
